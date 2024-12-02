import React, { useRef } from 'react';
import { Twitter, Facebook, MessageCircle } from 'lucide-react';
import { formatVerseText } from '../../utils/shareUtils';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ShareMenuItem } from './ShareMenuItem';
import { useShare } from '../../hooks/useShare';

interface ShareMenuProps {
  text: string;
  verseNumbers: string;
  surahName: string;
  onClose: () => void;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({
  text,
  verseNumbers,
  surahName,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, onClose);
  const { shareContent } = useShare();

  const formattedText = formatVerseText(text, surahName, verseNumbers);
  const encodedText = encodeURIComponent(formattedText);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
  };

  const handleNativeShare = async () => {
    const success = await shareContent(formattedText);
    if (success) {
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-border py-2 z-50 animate-fade-in"
    >
      <ShareMenuItem
        href={shareLinks.twitter}
        icon={Twitter}
        label="تويتر"
      />
      <ShareMenuItem
        href={shareLinks.facebook}
        icon={Facebook}
        label="فيسبوك"
      />
      <ShareMenuItem
        href={shareLinks.whatsapp}
        icon={MessageCircle}
        label="واتساب"
      />
    </div>
  );
};