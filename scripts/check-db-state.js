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

async function checkDatabaseState() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log('Connected to MongoDB');

    // Get all contacts
    const contacts = await Contact.find({});
    console.log(`Found ${contacts.length} contacts`);

    contacts.forEach((contact, index) => {
      const data = contact.toObject();
      console.log(`\n--- Contact ${index + 1} ---`);
      console.log(`Email: ${data.email}`);
      console.log(`Name: ${data.name}`);
      console.log(`Has messages array: ${Array.isArray(data.messages)}`);
      console.log(`Messages count: ${data.messages ? data.messages.length : 'N/A'}`);
      console.log(`Has subject field: ${data.hasOwnProperty('subject')}`);
      console.log(`Has message field: ${data.hasOwnProperty('message')}`);
      console.log(`Has status field: ${data.hasOwnProperty('status')}`);
      console.log(`Has overallStatus field: ${data.hasOwnProperty('overallStatus')}`);
      console.log(`All fields:`, Object.keys(data));
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run check
checkDatabaseState();
