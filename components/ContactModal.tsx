import React from 'react';
import Modal from './ui/Modal';
import Sidebar from './Sidebar';
import { useLanguage } from '../utils/i18n';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t('sidebar.contact_title')}
      maxWidth="max-w-md"
    >
      <div className="py-8 px-8 space-y-8">
        <Sidebar hideAbout />
      </div>
    </Modal>
  );
};

export default ContactModal;
