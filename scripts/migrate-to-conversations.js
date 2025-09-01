require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Define Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending',
  },
  sent_on: { type: Date },
}, { timestamps: true });

// Define Message Schema
const MessageSchema = new mongoose.Schema({
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending',
  },
  sent_on: { type: Date },
}, { timestamps: true });

// Define Conversation Schema
const ConversationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  messages: [MessageSchema],
  overallStatus: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending',
  },
  lastMessageAt: {
    type: Date,
    required: true,
  },
  firstContactAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

// Create models
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

async function migrateContactsToConversations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log('Connected to MongoDB');

    // Get all existing contacts
    const contacts = await Contact.find({}).sort({ email: 1, createdAt: 1 });
    console.log(`Found ${contacts.length} contacts to migrate`);

    // Group contacts by email
    const emailGroups = {};
    contacts.forEach(contact => {
      const email = contact.email;
      if (!emailGroups[email]) {
        emailGroups[email] = [];
      }
      emailGroups[email].push(contact);
    });

    console.log(`Grouped into ${Object.keys(emailGroups).length} conversations`);

    // Create conversations from grouped contacts
    let createdConversations = 0;
    let skippedConversations = 0;

    for (const [email, contactList] of Object.entries(emailGroups)) {
      // Check if conversation already exists
      const existingConversation = await Conversation.findOne({ email });
      if (existingConversation) {
        console.log(`Conversation for ${email} already exists, skipping...`);
        skippedConversations++;
        continue;
      }

      // Sort contacts by creation date
      contactList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      const firstContact = contactList[0];
      const lastContact = contactList[contactList.length - 1];

      // Create messages array
      const messages = contactList.map(contact => ({
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        sent_on: contact.sent_on,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
      }));

      // Calculate overall status
      const pendingCount = messages.filter(msg => msg.status === 'pending').length;
      const repliedCount = messages.filter(msg => msg.status === 'replied').length;
      
      let overallStatus = 'pending';
      if (repliedCount === messages.length) {
        overallStatus = 'replied';
      } else if (pendingCount === 0) {
        overallStatus = 'read';
      }

      // Create new conversation
      const conversation = new Conversation({
        email: firstContact.email,
        name: firstContact.name,
        phone: firstContact.phone,
        company: firstContact.company,
        messages: messages,
        overallStatus: overallStatus,
        lastMessageAt: lastContact.createdAt,
        firstContactAt: firstContact.createdAt,
      });

      await conversation.save();
      createdConversations++;
      console.log(`Created conversation for ${email} with ${messages.length} messages`);
    }

    console.log('\nMigration completed!');
    console.log(`Created ${createdConversations} new conversations`);
    console.log(`Skipped ${skippedConversations} existing conversations`);
    console.log(`Total conversations in database: ${await Conversation.countDocuments()}`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration
migrateContactsToConversations();
