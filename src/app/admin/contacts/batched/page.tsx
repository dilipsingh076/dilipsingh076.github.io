'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, Mail, User, MessageSquare, Calendar, Phone, Building, Search, Filter, Eye, EyeOff, MessageCircle, Clock } from 'lucide-react';
import ReplyModal from '@/components/admin/reply-modal';
import { BatchedContact, ILegacyContact } from '../types';
import { StatusFilter, SortBy } from '../../types';

const BatchedContactsManagement = () => {
  const [batchedContacts, setBatchedContacts] = useState<BatchedContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<BatchedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<BatchedContact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedContactForReply, setSelectedContactForReply] = useState<ILegacyContact | null>(null);

  useEffect(() => {
    fetchBatchedContacts();
  }, []);

  const filterAndSortContacts = useCallback(() => {
    let filtered = batchedContacts;

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
          return new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime();
      }
    });

    setFilteredContacts(filtered);
  }, [batchedContacts, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    filterAndSortContacts();
  }, [filterAndSortContacts]);

  const fetchBatchedContacts = async () => {
    try {
      const response = await fetch('/api/contact/batched/');
      const data = await response.json();
      if (data.success) {
        setBatchedContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching batched contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (email: string, newStatus: StatusFilter) => {
    try {
      setMarkingAsRead(email);
      
      // Update all contacts for this email
      const contact = batchedContacts.find(c => c.email === email);
      if (!contact) return;

      const updatePromises = contact.contacts.map(async (c) => {
        const response = await fetch(`/api/contact/${c._id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });
        return response.ok;
      });

      const results = await Promise.all(updatePromises);
      
      if (results.every(r => r)) {
        fetchBatchedContacts();
        if (selectedContact?.email === email) {
          setSelectedContact({ ...selectedContact, overallStatus: newStatus });
        }
        
        setToastMessage(`Marked all messages from "${contact.name}" as ${newStatus}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    } finally {
      setMarkingAsRead(null);
    }
  };

  const handleReplySent = () => {
    fetchBatchedContacts();
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

  const getStatusColor = (status: StatusFilter) => {
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

  const getStatusIcon = (status: StatusFilter) => {
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
          <p className="mt-4 text-gray-600">Loading batched contacts...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Batched Contact Submissions</h1>
          <p className="mt-2 text-gray-600">View contact submissions grouped by email address</p>
          <p className="mt-1 text-sm text-blue-600">
            💡 Messages from the same email are grouped together for better organization
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="messages">Sort by Message Count</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-600">
                {filteredContacts.length} of {batchedContacts.length} conversations
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Conversations ({filteredContacts.length})
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredContacts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{batchedContacts.length === 0 ? 'No contact submissions yet' : 'No conversations match your filters'}</p>
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.email}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContact?.email === contact.email ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {contact.name}
                            </p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.overallStatus)}`}>
                              {markingAsRead === contact.email ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                              ) : (
                                getStatusIcon(contact.overallStatus)
                              )}
                              <span className="ml-1">{contact.overallStatus}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {contact.email}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {contact.latestMessage.subject}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span className="flex items-center">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              {contact.totalMessages} messages
                            </span>
                            {contact.unreadCount > 0 && (
                              <span className="flex items-center text-yellow-600">
                                <EyeOff className="h-3 w-3 mr-1" />
                                {contact.unreadCount} unread
                              </span>
                            )}
                            {contact.repliedCount > 0 && (
                              <span className="flex items-center text-green-600">
                                <Mail className="h-3 w-3 mr-1" />
                                {contact.repliedCount} replied
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(contact.latestMessage.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Conversation with {selectedContact.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedContact.overallStatus)}`}>
                      {markingAsRead === selectedContact.email ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      ) : (
                        getStatusIcon(selectedContact.overallStatus)
                      )}
                      <span className="ml-1 capitalize">{selectedContact.overallStatus}</span>
                    </span>
                    <select
                      value={selectedContact.overallStatus}
                      onChange={(e) => handleStatusChange(selectedContact.email, e.target.value as StatusFilter)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Mark as Pending</option>
                      <option value="read">Mark as Read</option>
                      <option value="replied">Mark as Replied</option>
                    </select>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          <label className="text-sm font-medium text-gray-700">Name</label>
                        </div>
                        <p className="text-gray-900 font-medium">{selectedContact.name}</p>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <Mail className="h-5 w-5 text-gray-400 mr-2" />
                          <label className="text-sm font-medium text-gray-700">Email</label>
                        </div>
                        <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:text-blue-800">
                          {selectedContact.email}
                        </a>
                      </div>

                      {selectedContact.phone && (
                        <div>
                          <div className="flex items-center mb-2">
                            <Phone className="h-5 w-5 text-gray-400 mr-2" />
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                          </div>
                          <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:text-blue-800">
                            {selectedContact.phone}
                          </a>
                        </div>
                      )}

                      {selectedContact.company && (
                        <div>
                          <div className="flex items-center mb-2">
                            <Building className="h-5 w-5 text-gray-400 mr-2" />
                            <label className="text-sm font-medium text-gray-700">Company</label>
                          </div>
                          <p className="text-gray-900">{selectedContact.company}</p>
                        </div>
                      )}
                    </div>

                    {/* Conversation Stats */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <MessageCircle className="h-5 w-5 text-gray-400 mr-2" />
                          <label className="text-sm font-medium text-gray-700">Total Messages</label>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{selectedContact.totalMessages}</p>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <label className="text-sm font-medium text-gray-700">First Contact</label>
                        </div>
                        <p className="text-gray-900">{formatDate(selectedContact.firstContact)}</p>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <label className="text-sm font-medium text-gray-700">Latest Message</label>
                        </div>
                        <p className="text-gray-900">{formatDate(selectedContact.latestMessage.createdAt)}</p>
                      </div>

                      {selectedContact.lastReplySent && (
                        <div>
                          <div className="flex items-center mb-2">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <label className="text-sm font-medium text-gray-700">Last Reply Sent</label>
                          </div>
                          <p className="text-gray-900">{formatDate(selectedContact.lastReplySent)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">All Messages</h4>
                    {selectedContact.contacts.map((contact, index) => (
                      <div key={contact._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                              {getStatusIcon(contact.status)}
                              <span className="ml-1">{contact.status}</span>
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(contact.createdAt)}
                            </span>
                          </div>
                          {contact.sent_on && (
                            <span className="text-xs text-green-600">
                              Reply sent: {formatDate(contact.sent_on)}
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">{contact.subject}</h5>
                        <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedContactForReply(selectedContact.contacts[0]);
                        setShowReplyModal(true);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact.email, 'replied')}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Mark All as Replied
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
                <p className="text-gray-500">
                  Choose a conversation from the list to view all messages
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
                <p className="text-sm font-medium text-blue-600">Total Conversations</p>
                <p className="text-2xl font-bold text-blue-900">{batchedContacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <EyeOff className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {batchedContacts.filter(contact => contact.overallStatus === 'pending').length}
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
                  {batchedContacts.filter(contact => contact.overallStatus === 'read').length}
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
                  {batchedContacts.filter(contact => contact.overallStatus === 'replied').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        contact={selectedContactForReply}
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setSelectedContactForReply(null);
        }}
        onReplySent={handleReplySent}
      />
    </div>
  );
};

export default BatchedContactsManagement;
