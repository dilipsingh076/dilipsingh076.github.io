'use client';

import { useState, useEffect } from 'react';
import { X, Send, Mail } from 'lucide-react';
import { ReplyModalProps } from './types';

export default function ReplyModal({ contact, isOpen, onClose, onReplySent }: ReplyModalProps) {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form when contact changes
  useEffect(() => {
    if (contact) {
      const subject = 'latestMessage' in contact 
        ? contact.latestMessage.subject 
        : contact.subject;
      
      setFormData({
        to: contact.email,
        subject: `Re: ${subject}`,
        message: '',
      });
      setError('');
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-reply/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId: contact ? ('_id' in contact ? contact._id : contact.id) : '',
          to: formData.to,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onReplySent();
        onClose();
        // Reset form
        const subject = contact && 'latestMessage' in contact 
          ? contact.latestMessage.subject 
          : contact?.subject || '';
        
        setFormData({
          to: contact?.email || '',
          subject: `Re: ${subject}`,
          message: '',
        });
      } else {
        setError(data.message || 'Failed to send reply');
      }
    } catch (error) {
      setError('Failed to send reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setError('');
    }
  };

  if (!isOpen || !contact) return null;

  const subject = 'latestMessage' in contact 
    ? contact.latestMessage.subject 
    : contact.subject;
  
  const message = 'latestMessage' in contact 
    ? contact.latestMessage.message 
    : contact.message;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Mail className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Reply to {contact.name}</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Original Message Preview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Original Message:</h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>From:</strong> {contact.name} ({contact.email})
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Subject:</strong> {subject}
            </p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{message}</p>
          </div>

          {/* To Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="email"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Reply
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your reply message here..."
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
