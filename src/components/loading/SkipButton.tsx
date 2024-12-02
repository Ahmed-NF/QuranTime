import React from 'react';

interface SkipButtonProps {
  onSkip: () => void;
  visible: boolean;
}

export const SkipButton: React.FC<SkipButtonProps> = ({ onSkip, visible }) => {
  if (!visible) return null;

  return (
    <button
      onClick={onSkip}
      className="mt-6 px-4 py-2 text-sm text-primary hover:text-primary-hover transition-colors"
    >
      تخطي التحميل
    </button>
  );
};