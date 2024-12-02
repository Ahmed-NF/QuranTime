import React from 'react';
import { Focus, MinusCircle } from 'lucide-react';
import { IconButton } from './IconButton';

interface FocusButtonProps {
  isFocused: boolean;
  onToggle: () => void;
}

export const FocusButton: React.FC<FocusButtonProps> = ({ isFocused, onToggle }) => {
  return (
    <IconButton
      icon={isFocused ? MinusCircle : Focus}
      variant={isFocused ? 'primary' : 'ghost'}
      size="md"
      onClick={onToggle}
      label={isFocused ? 'إلغاء وضع التركيز' : 'وضع التركيز'}
      className={`transition-all duration-300 ${
        isFocused ? 'bg-primary text-white hover:bg-primary-hover' : 'hover:bg-primary/10'
      }`}
    />
  );
};