import React from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  onClose 
}) => {
  const bgColor = {
    success: 'bg-primary',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between gap-4 animate-slide-up`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};