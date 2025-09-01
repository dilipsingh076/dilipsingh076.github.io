import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { submitContactForm } from '@/store/slices/contactSlice';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContact = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.contact);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(submitContactForm(formData));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return {
    formData,
    loading,
    error,
    success,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};

