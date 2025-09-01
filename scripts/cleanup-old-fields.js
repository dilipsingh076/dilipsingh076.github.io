require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

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
  isAdminReply: { type: Boolean, default: false },
  adminReplyTo: { type: String },
}, { timestamps: true });

// Define Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  messages: [MessageSchema],
  overallStatus: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending',
  },
  lastMessageAt: { type: Date, required: true },
  firstContactAt: { type: Date, required: true },
}, { timestamps: true });

// Create model
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

async function cleanupAndConsolidate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log('Connected to MongoDB');

    // Get all contacts
    const contacts = await Contact.find({});
    console.log(`Found ${contacts.length} contacts`);

    // Group contacts by email
    const emailGroups = {};
    contacts.forEach(contact => {
      const email = contact.email;
      if (!emailGroups[email]) {
        emailGroups[email] = [];
      }
      emailGroups[email].push(contact);
    });

    console.log(`\nEmail groups:`, Object.keys(emailGroups));

    // Process each email group
    for (const [email, contactList] of Object.entries(emailGroups)) {
      if (contactList.length === 1) {
        // Single contact, just clean up old fields
        const contact = contactList[0];
        const data = contact.toObject();
        
        if (data.subject || data.message || data.status) {
          console.log(`Cleaning up single contact: ${email}`);
          
          // Remove old fields
          contact.subject = undefined;
          contact.message = undefined;
          contact.status = undefined;
          contact.sent_on = undefined;
          
          await contact.save();
          console.log(`✓ Cleaned up contact: ${email}`);
        }
      } else {
        // Multiple contacts, consolidate them
        console.log(`\nConsolidating ${contactList.length} contacts for: ${email}`);
        
        // Sort by creation date to keep the oldest as the main contact
        contactList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const mainContact = contactList[0];
        const otherContacts = contactList.slice(1);
        
        // Merge all messages into the main contact
        for (const otherContact of otherContacts) {
          const otherData = otherContact.toObject();
          if (otherData.messages && otherData.messages.length > 0) {
            mainContact.messages.push(...otherData.messages);
          }
        }
        
        // Update timestamps
        mainContact.lastMessageAt = new Date(Math.max(...mainContact.messages.map(m => new Date(m.createdAt))));
        mainContact.firstContactAt = new Date(Math.min(...mainContact.messages.map(m => new Date(m.createdAt))));
        
        // Update overall status
        const pendingCount = mainContact.messages.filter(m => m.status === 'pending').length;
        const repliedCount = mainContact.messages.filter(m => m.status === 'replied').length;
        
        if (repliedCount === mainContact.messages.length) {
          mainContact.overallStatus = 'replied';
        } else if (pendingCount === 0) {
          mainContact.overallStatus = 'read';
        } else {
          mainContact.overallStatus = 'pending';
        }
        
        // Remove old fields from main contact
        mainContact.subject = undefined;
        mainContact.message = undefined;
        mainContact.status = undefined;
        mainContact.sent_on = undefined;
        
        await mainContact.save();
        console.log(`✓ Consolidated into main contact: ${email} (${mainContact.messages.length} messages)`);
        
        // Delete other contacts
        for (const otherContact of otherContacts) {
          await Contact.findByIdAndDelete(otherContact._id);
          console.log(`✓ Deleted duplicate contact: ${otherContact._id}`);
        }
      }
    }

    console.log(`\nCleanup and consolidation completed!`);

  } catch (error) {
    console.error('Cleanup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run cleanup
cleanupAndConsolidate();
