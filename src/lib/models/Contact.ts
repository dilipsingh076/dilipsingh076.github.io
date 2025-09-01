import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  _id: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'pending' | 'read' | 'replied';
  sent_on?: Date;
  isAdminReply?: boolean;
  adminReplyTo?: string;
}

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  messages: IMessage[];
  overallStatus: 'pending' | 'read' | 'replied';
  lastMessageAt: Date;
  firstContactAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending',
  },
  sent_on: {
    type: Date,
  },
  isAdminReply: {
    type: Boolean,
    default: false,
  },
  adminReplyTo: {
    type: String,
  },
}, {
  timestamps: true,
});

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
}, {
  timestamps: true,
});

// Create indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ overallStatus: 1 });
ContactSchema.index({ lastMessageAt: -1 });
ContactSchema.index({ firstContactAt: -1 });

// Method to add a new message to contact
ContactSchema.methods.addMessage = function(subject: string, message: string, phone?: string, company?: string) {
  // Update contact info if provided
  if (phone) this.phone = phone;
  if (company) this.company = company;
  
  // Add new message
  this.messages.push({
    subject,
    message,
    status: 'pending',
    createdAt: new Date(),
  });
  
  // Update timestamps
  this.lastMessageAt = new Date();
  if (!this.firstContactAt) {
    this.firstContactAt = new Date();
  }
  
  // Update overall status
  this.updateOverallStatus();
  
  return this.save();
};

// Method to update overall status
ContactSchema.methods.updateOverallStatus = function() {
  const pendingCount = this.messages.filter((msg: IMessage) => msg.status === 'pending').length;
  const repliedCount = this.messages.filter((msg: IMessage) => msg.status === 'replied').length;
  
  if (repliedCount === this.messages.length) {
    this.overallStatus = 'replied';
  } else if (pendingCount === 0) {
    this.overallStatus = 'read';
  } else {
    this.overallStatus = 'pending';
  }
};

// Method to add admin reply
ContactSchema.methods.addAdminReply = function(subject: string, message: string, replyToMessageId?: string) {
  // Add admin reply message
  this.messages.push({
    subject,
    message,
    status: 'replied',
    sent_on: new Date(),
    isAdminReply: true,
    adminReplyTo: replyToMessageId,
    createdAt: new Date(),
  });
  
  // Update timestamps
  this.lastMessageAt = new Date();
  
  // Update overall status
  this.updateOverallStatus();
  
  return this.save();
};

// Method to mark all messages as read
ContactSchema.methods.markAllAsRead = function() {
  this.messages.forEach((msg: IMessage) => {
    if (msg.status === 'pending') {
      msg.status = 'read';
    }
  });
  this.updateOverallStatus();
  return this.save();
};

// Method to mark all messages as replied
ContactSchema.methods.markAllAsReplied = function() {
  this.messages.forEach((msg: IMessage) => {
    if (msg.status !== 'replied') {
      msg.status = 'replied';
      msg.sent_on = new Date();
    }
  });
  this.updateOverallStatus();
  return this.save();
};

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
