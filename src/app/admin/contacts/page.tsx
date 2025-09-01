'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Mail, User, MessageSquare, Calendar, Phone, Building, Search, Filter, Eye, EyeOff, MessageCircle, Clock, Send, ArrowLeft } from 'lucide-react';
import ReplyModal from '@/components/admin/reply-modal';
import { IContact, IMessage } from './types';
import { StatusFilter, SortBy } from '../types';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessageForReply, setSelectedMessageForReply] = useState<IMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterAndSortContacts();
  }, [contacts, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filterAndSortContacts = () => {
    let filtered = contacts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.latestMessage.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.latestMessage.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.overallStatus === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.overallStatus.localeCompare(b.overallStatus);
        case 'messages':
          return b.totalMessages - a.totalMessages;
        case 'date':
        default:
          return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
      }
    });

    setFilteredContacts(filtered);
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact/');
      const data = await response.json();
      if (data.success) {
        // Transform the data to match our interface
        const transformedContacts = data.contacts.map((contact: any) => ({
          id: contact.id,
          email: contact.email,
          name: contact.name,
          phone: contact.phone,
          company: contact.company,
          overallStatus: contact.overallStatus,
          lastMessageAt: contact.lastMessageAt,
          firstContactAt: contact.firstContactAt,
          totalMessages: contact.messages.length,
          unreadCount: contact.messages.filter((msg: any) => msg.status === 'pending').length,
          repliedCount: contact.messages.filter((msg: any) => msg.status === 'replied').length,
          latestMessage: contact.messages[contact.messages.length - 1],
          messages: contact.messages,
        }));
        setContacts(transformedContacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId: string, action: string, messageId?: string) => {
    try {
      setMarkingAsRead(contactId);
      
      const response = await fetch(`/api/contact/${contactId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, messageId }),
      });

      if (response.ok) {
        fetchContacts();
        const contact = contacts.find(c => c.id === contactId);
        if (contact) {
          setToastMessage(`Updated contact with ${contact.name}`);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    } finally {
      setMarkingAsRead(null);
    }
  };

  const handleReplySent = () => {
    fetchContacts();
    setToastMessage('Reply sent successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'read':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <EyeOff className="h-4 w-4" />;
      case 'read':
        return <Eye className="h-4 w-4" />;
      case 'replied':
        return <Mail className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
          {toastMessage}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="mt-2 text-gray-600">Manage contact form submissions like a messaging app</p>
          <p className="mt-1 text-sm text-blue-600">
            💡 Messages from the same email are grouped into conversations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contacts List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
              </div>

              {/* Contacts */}
              <div className="max-h-96 overflow-y-auto">
                {filteredContacts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{contacts.length === 0 ? 'No contacts yet' : 'No contacts match your filters'}</p>
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {contact.name}
                            </p>
                            {contact.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {contact.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {contact.email}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {contact.latestMessage.subject}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTime(contact.lastMessageAt)}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.overallStatus)}`}>
                          {getStatusIcon(contact.overallStatus)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            {selectedContact ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="lg:hidden mr-3 text-gray-400 hover:text-gray-600"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-500">{selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedContact.overallStatus)}`}>
                      {getStatusIcon(selectedContact.overallStatus)}
                      <span className="ml-1 capitalize">{selectedContact.overallStatus}</span>
                    </span>
                    <button
                      onClick={() => handleStatusChange(selectedContact.id, 'markAllAsRead')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as Read
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedContact.messages.map((message, index) => {
                    // Determine if this is an admin reply based on subject pattern or flag
                    const isAdminReply = message.isAdminReply || (message.subject.startsWith('Re:') && message.sent_on);
                    
                    return (
                      <div key={message._id} className="flex flex-col">
                        <div className={`flex items-start gap-3 ${isAdminReply ? 'flex-row-reverse' : ''}`}>
                          <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isAdminReply ? 'bg-green-500' : 'bg-blue-500'
                            }`}>
                              <span className="text-white text-sm font-medium">
                                {isAdminReply ? 'A' : selectedContact.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className={`flex-1 min-w-0 ${isAdminReply ? 'text-right' : ''}`}>
                            <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                              isAdminReply 
                                ? 'bg-green-100 ml-auto' 
                                : 'bg-gray-100'
                            }`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {isAdminReply ? 'You' : message.subject}
                                </span>
                                {!isAdminReply && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(message.status)}`}>
                                    {getStatusIcon(message.status)}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {message.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">
                                  {formatTime(message.createdAt)}
                                </span>
                                {isAdminReply && (
                                  <span className="text-xs text-green-600">
                                    Sent
                                  </span>
                                )}
                                {!isAdminReply && message.sent_on && (
                                  <span className="text-xs text-green-600">
                                    Reply sent: {formatTime(message.sent_on)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Actions */}
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedMessageForReply(selectedContact.latestMessage);
                        setShowReplyModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Reply
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact.id, 'markAllAsReplied')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark All Replied
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Contact</h3>
                <p className="text-gray-500">
                  Choose a contact from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total Contacts</p>
                <p className="text-2xl font-bold text-blue-900">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <EyeOff className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {contacts.filter(contact => contact.overallStatus === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Read</p>
                <p className="text-2xl font-bold text-green-900">
                  {contacts.filter(contact => contact.overallStatus === 'read').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Replied</p>
                <p className="text-2xl font-bold text-purple-900">
                  {contacts.filter(contact => contact.overallStatus === 'replied').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        contact={selectedContact}
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setSelectedMessageForReply(null);
        }}
        onReplySent={handleReplySent}
      />
    </div>
  );
};

export default ContactsManagement;
