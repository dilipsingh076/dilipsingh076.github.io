import { StatusFilter } from '../types';

// Contact Types
export interface IMessage {
  _id: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'read' | 'replied';
  sent_on?: string;
  isAdminReply?: boolean;
  adminReplyTo?: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  messages: IMessage[];
  overallStatus: 'pending' | 'read' | 'replied';
  lastMessageAt: string;
  firstContactAt: string;
  totalMessages: number;
  unreadCount: number;
  repliedCount: number;
  latestMessage: IMessage;
  createdAt: string;
  updatedAt: string;
}

// Legacy contact structure for batched contacts API
export interface ILegacyContact {
  _id: string;
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  status: 'pending' | 'read' | 'replied';
  sent_on?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BatchedContact {
  email: string;
  name: string;
  phone?: string;
  company?: string;
  totalMessages: number;
  unreadCount: number;
  repliedCount: number;
  overallStatus: StatusFilter;
  latestMessage: {
    subject: string;
    message: string;
    createdAt: string;
    status: string;
  };
  lastReplySent?: string;
  firstContact: string;
  contacts: ILegacyContact[];
}
