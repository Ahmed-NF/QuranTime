import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { ShareMenu } from './ShareMenu';
import { copyToClipboard } from '../../utils/shareUtils';
import { useToast } from '../../hooks/useToast';
import { useA11y } from '../../hooks/useA11y';

interface ShareButtonProps {
  text: string;
  verseNumbers: string;
  surahName: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  text,
  verseNumbers,
  surahName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { showToast } = useToast();
  const { handleKeyPress } = useA11y();

  const handleCopy = async () => {
    setIsCopying(true);
    const success = await copyToClipboard(text, surahName, verseNumbers);
    
    if (success) {
      setCopySuccess(true);
      showToast('تم نسخ النص بنجاح', 'success');
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      showToast('فشل نسخ النص. الرجاء المحاولة مرة أخرى أو استخدام اختصار لوحة المفاتيح (Ctrl/Cmd + C)', 'error');
    }
    setIsCopying(false);
  };

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <Button
        icon={copySuccess ? Check : Copy}
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        onKeyDown={(e) => handleKeyPress(e, handleCopy)}
        label={copySuccess ? 'تم النسخ!' : 'نسخ النص'}
        isLoading={isCopying}
        isSuccess={copySuccess}
        aria-label="نسخ النص"
        className="focus:ring-2 focus:ring-primary/20"
      />
      
      <div className="relative">
        <Button
          icon={Share2}
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onKeyDown={(e) => handleKeyPress(e, () => setIsMenuOpen(!isMenuOpen))}
          label="مشاركة"
          aria-label="فتح قائمة المشاركة"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          className="focus:ring-2 focus:ring-primary/20"
        />
        
        {isMenuOpen && (
          <ShareMenu
            text={text}
            verseNumbers={verseNumbers}
            surahName={surahName}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};