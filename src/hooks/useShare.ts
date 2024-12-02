import { useState } from 'react';

export const useShare = () => {
  const [error, setError] = useState<string | null>(null);

  const shareContent = async (text: string): Promise<boolean> => {
    if (!navigator.share) {
      setError('مشاركة المحتوى غير متوفرة في متصفحك');
      return false;
    }

    try {
      await navigator.share({
        text,
        url: window.location.href,
      });
      return true;
    } catch (err) {
      if (err instanceof Error) {
        // Only set error if it's not a user cancellation
        if (err.name !== 'AbortError') {
          setError('حدث خطأ أثناء مشاركة المحتوى');
        }
      }
      return false;
    }
  };

  return {
    shareContent,
    error,
    clearError: () => setError(null),
  };
};