# Messaging System Documentation

## Overview

The new messaging system transforms contact form submissions into a conversation-based interface, similar to modern messaging applications. Messages from the same email address are automatically grouped into conversations, making it easier to manage ongoing communications.

## Key Features

### 🎯 **Conversation-Based Architecture**
- **Single Object per Email**: Each email address gets one conversation object in the database
- **Message History**: All messages from the same person are stored in chronological order
- **Smart Grouping**: Automatic grouping by email address with contact info preservation

### 💬 **Messaging App Interface**
- **Chat-like UI**: Messages displayed in a familiar chat interface
- **Real-time Updates**: Status changes and new messages update immediately
- **Message Bubbles**: Each message shown in a chat bubble with timestamps
- **Status Indicators**: Visual status badges for pending, read, and replied messages

### 📊 **Advanced Management**
- **Overall Status**: Conversation-level status based on all messages
- **Message Counts**: Track total, unread, and replied message counts
- **Reply Tracking**: Timestamp when replies were sent
- **Bulk Operations**: Mark all messages in a conversation as read/replied

## Database Schema

### Conversation Model
```typescript
interface IConversation {
  email: string;           // Unique email identifier
  name: string;           // Contact name
  phone?: string;         // Contact phone
  company?: string;       // Contact company
  messages: IMessage[];   // Array of all messages
  overallStatus: 'pending' | 'read' | 'replied';
  lastMessageAt: Date;    // Timestamp of latest message
  firstContactAt: Date;   // Timestamp of first contact
  createdAt: Date;
  updatedAt: Date;
}
```

### Message Model
```typescript
interface IMessage {
  _id: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  sent_on?: Date;         // When reply was sent
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Conversations
- `GET /api/conversations/` - List all conversations
- `GET /api/conversations/[id]/` - Get specific conversation
- `PUT /api/conversations/[id]/` - Update conversation status
- `DELETE /api/conversations/[id]/` - Delete conversation

### Contact Form
- `POST /api/contact/` - Submit new contact (creates/updates conversation)

### Reply System
- `POST /api/send-reply/` - Send reply email and update status

## Usage Examples

### Creating a New Contact
```javascript
// First message from john@example.com
POST /api/contact/
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "First message"
}
// Creates new conversation

// Second message from same email
POST /api/contact/
{
  "name": "John Doe", 
  "email": "john@example.com",
  "subject": "Follow up",
  "message": "Second message"
}
// Adds to existing conversation
```

### Managing Conversations
```javascript
// Mark all messages as read
PUT /api/conversations/[id]/
{
  "action": "markAllAsRead"
}

// Mark specific message as replied
PUT /api/conversations/[id]/
{
  "action": "markMessageAsReplied",
  "messageId": "message_id"
}
```

## Admin Interface

### Conversation List
- **Search**: Find conversations by name, email, or message content
- **Filter**: Filter by status (pending, read, replied)
- **Sort**: Sort by date, name, status, or message count
- **Unread Badges**: Visual indicators for unread messages

### Chat Interface
- **Message Bubbles**: Each message in a chat bubble
- **Timestamps**: Show when each message was sent
- **Status Icons**: Visual status indicators
- **Reply Actions**: Quick reply and status management
- **Auto-scroll**: Automatically scroll to latest messages

## Migration

The system includes a migration script to convert existing contacts:

```bash
node scripts/migrate-to-conversations.js
```

This script:
1. Groups existing contacts by email
2. Creates conversation objects
3. Preserves all message history
4. Maintains status information
5. Calculates overall conversation status

## Benefits

### For Users
- **Better Organization**: All messages from one person in one place
- **Conversation History**: See full context of communications
- **Professional Interface**: Modern chat-like experience

### For Administrators
- **Efficient Management**: Handle conversations instead of individual messages
- **Status Tracking**: Clear overview of conversation status
- **Bulk Operations**: Manage multiple messages at once
- **Reply History**: Track when and what was replied

### Technical Benefits
- **Scalable Architecture**: Single object per email reduces database complexity
- **Performance**: Optimized queries with proper indexing
- **Maintainable**: Clean separation of concerns
- **Extensible**: Easy to add new features like typing indicators, read receipts, etc.

## Future Enhancements

- **Real-time Updates**: WebSocket integration for live updates
- **Message Templates**: Pre-written reply templates
- **File Attachments**: Support for file uploads
- **Message Threading**: Reply to specific messages
- **Notifications**: Push notifications for new messages
- **Analytics**: Conversation metrics and insights

## File Structure

```
src/
├── lib/models/
│   ├── Conversation.ts          # Conversation model
│   └── Contact.ts               # Legacy contact model
├── app/api/
│   ├── conversations/
│   │   ├── route.ts             # List conversations
│   │   └── [id]/route.ts        # Individual conversation
│   ├── contact/route.ts         # Contact form (updated)
│   └── send-reply/route.ts      # Reply system (updated)
├── app/admin/
│   └── conversations/
│       └── page.tsx             # Messaging interface
└── components/admin/
    └── reply-modal.tsx          # Reply modal component
```

This messaging system provides a modern, efficient way to manage customer communications while maintaining all the functionality of the previous contact management system.
