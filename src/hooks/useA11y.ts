import { KeyboardEvent } from 'react';

export const useA11y = () => {
  const handleKeyPress = (
    event: KeyboardEvent,
    callback: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  return { handleKeyPress };
};