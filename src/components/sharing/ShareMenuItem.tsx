import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ShareMenuItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export const ShareMenuItem: React.FC<ShareMenuItemProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
}) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full px-4 py-2 text-right hover:bg-primary/5 flex items-center gap-2 transition-colors"
      >
        <Icon size={16} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block px-4 py-2 text-right hover:bg-primary/5 flex items-center gap-2 transition-colors"
    >
      <Icon size={16} />
      <span>{label}</span>
    </a>
  );
};