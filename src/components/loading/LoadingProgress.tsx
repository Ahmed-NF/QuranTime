import React from 'react';

interface LoadingProgressProps {
  progress: number;
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({ progress }) => {
  return (
    <div className="w-64 mt-8">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
              جاري التحميل
            </span>
          </div>
          <div className="text-left">
            <span className="text-xs font-semibold inline-block text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary/10">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-700 ease-out"
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};