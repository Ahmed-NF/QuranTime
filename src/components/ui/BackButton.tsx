import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../icons';

interface BackButtonProps {
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  label = 'العودة إلى قائمة السور'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <button
      onClick={handleBack}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary transition-all duration-300"
    >
      <Icons.Back className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      <span className="font-medium">{label}</span>
    </button>
  );
};