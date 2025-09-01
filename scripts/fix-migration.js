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

async function fixMigration() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log('Connected to MongoDB');

    // Get all contacts
    const contacts = await Contact.find({});
    console.log(`Found ${contacts.length} contacts`);

    let fixedCount = 0;

    for (const contact of contacts) {
      const data = contact.toObject();
      
      // Check if this contact has old fields but empty messages array
      if (data.subject && data.message && data.messages && data.messages.length === 0) {
        console.log(`Fixing contact: ${data.email}`);
        
        // Create message from old contact data
        const message = {
          subject: data.subject,
          message: data.message,
          status: data.status || 'pending',
          sent_on: data.sent_on,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };

        // Add message to the array
        contact.messages.push(message);
        
        // Update overall status
        contact.overallStatus = data.status || 'pending';
        contact.lastMessageAt = data.createdAt;
        contact.firstContactAt = data.createdAt;

        // Remove old fields
        contact.subject = undefined;
        contact.message = undefined;
        contact.status = undefined;
        contact.sent_on = undefined;

        await contact.save();
        fixedCount++;
        console.log(`✓ Fixed contact: ${contact.email}`);
      } else {
        console.log(`Contact ${data.email} is already correct, skipping...`);
      }
    }

    console.log(`\nMigration fix completed!`);
    console.log(`Fixed ${fixedCount} contacts`);

  } catch (error) {
    console.error('Migration fix failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration fix
fixMigration();
