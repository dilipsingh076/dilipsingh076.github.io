import { IContact, ILegacyContact } from '@/app/admin/contacts/types';

// Admin Component Types
export interface ReplyModalProps {
  contact: IContact | ILegacyContact | null;
  isOpen: boolean;
  onClose: () => void;
  onReplySent: () => void;
}
