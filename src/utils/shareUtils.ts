export const copyToClipboard = async (
  text: string,
  surahName: string,
  verseNumbers: string
): Promise<boolean> => {
  const formattedText = formatVerseText(text, surahName, verseNumbers);
  
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(formattedText);
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return fallbackCopyToClipboard(formattedText);
    }
  }
  return fallbackCopyToClipboard(formattedText);
};

const fallbackCopyToClipboard = (text: string): boolean => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Make the textarea invisible
  Object.assign(textArea.style, {
    position: 'fixed',
    left: '-9999px',
    top: '-9999px'
  });
  
  document.body.appendChild(textArea);
  
  try {
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    document.body.removeChild(textArea);
    return false;
  }
};

export const formatVerseText = (
  text: string,
  surahName: string,
  verseNumbers: string
): string => {
  return `${text}\n\n— سورة ${surahName}، الآية ${verseNumbers}`;
};

export const shareViaNavigator = async (
  text: string,
  url: string
): Promise<boolean> => {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      text,
      url
    });
    return true;
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') {
      console.error('Share failed:', err);
    }
    return false;
  }
};