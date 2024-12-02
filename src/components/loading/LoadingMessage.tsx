import React from 'react';

interface LoadingMessageProps {
  message: string;
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => {
  return (
    <p className="text-text-secondary mt-4 text-sm">
      {message}
    </p>
  );
};