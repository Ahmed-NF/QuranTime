import React from 'react';
import { Focus } from 'lucide-react';
import { IconButton } from './IconButton';

interface FocusControlsProps {
  onEnterFocus: () => void;
}

export const FocusControls: React.FC<FocusControlsProps> = ({ onEnterFocus }) => {
  return (
    <IconButton
      icon={Focus}
      variant="ghost"
      size="md"
      onClick={onEnterFocus}
      label="وضع التركيز"
      className="transition-all duration-300 hover:bg-primary/10"
    />
  );
};