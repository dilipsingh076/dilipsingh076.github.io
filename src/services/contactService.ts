import { apiService } from './api';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

class ContactService {
  async submitContact(form: ContactForm): Promise<Contact> {
    const response = await apiService.post<Contact>('/api/contact', form);
    return response.data;
  }

  async getContacts(): Promise<Contact[]> {
    const response = await apiService.get<Contact[]>('/api/contact');
    return response.data;
  }

  async getContact(id: string): Promise<Contact> {
    const response = await apiService.get<Contact>(`/api/contact/${id}`);
    return response.data;
  }

  async updateContactStatus(id: string, status: Contact['status']): Promise<Contact> {
    const response = await apiService.patch<Contact>(`/api/contact/${id}`, { status });
    return response.data;
  }

  async deleteContact(id: string): Promise<void> {
    await apiService.delete(`/api/contact/${id}`);
  }
}

export const contactService = new ContactService();


