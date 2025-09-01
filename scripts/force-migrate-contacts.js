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

async function forceMigrateContacts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log('Connected to MongoDB');

    // Get all existing contacts
    const oldContacts = await Contact.find({});
    console.log(`Found ${oldContacts.length} contacts to migrate`);

    let migratedCount = 0;

    for (const contact of oldContacts) {
      const oldData = contact.toObject();
      
      // Check if this contact has old schema (has subject and message fields)
      if (oldData.subject && oldData.message && !oldData.messages) {
        console.log(`Migrating contact: ${oldData.email}`);
        
        // Create message from old contact data
        const message = {
          subject: oldData.subject,
          message: oldData.message,
          status: oldData.status || 'pending',
          sent_on: oldData.sent_on,
          createdAt: oldData.createdAt,
          updatedAt: oldData.updatedAt,
        };

        // Update contact with new schema
        contact.messages = [message];
        contact.overallStatus = oldData.status || 'pending';
        contact.lastMessageAt = oldData.createdAt;
        contact.firstContactAt = oldData.createdAt;

        // Remove old fields
        contact.subject = undefined;
        contact.message = undefined;
        contact.status = undefined;
        contact.sent_on = undefined;

        await contact.save();
        migratedCount++;
        console.log(`✓ Migrated contact: ${contact.email}`);
      } else {
        console.log(`Contact ${oldData.email} already has new schema, skipping...`);
      }
    }

    console.log(`\nMigration completed!`);
    console.log(`Migrated ${migratedCount} contacts`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration
forceMigrateContacts();
