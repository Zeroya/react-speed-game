import { useEffect } from 'react';
import { ModalVariant } from '@/types';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  autoCloseDelay?: number;
  children: React.ReactNode;
  variant?: ModalVariant;
}

export const Modal = ({ isOpen, onClose, autoCloseDelay, children, variant = ModalVariant.Default }: ModalProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay && onClose) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal modal--${variant}`}>
        {children}
      </div>
    </div>
  );
};

