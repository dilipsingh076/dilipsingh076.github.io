// Contact Types for public contact pages
export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}
