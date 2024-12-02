import React from 'react';

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`min-h-screen bg-[#f8f9fa] flex items-center justify-center ${className}`}>
    <div className="relative">
      <div className="w-12 h-12 border-4 border-primary/30 rounded-full"></div>
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
    </div>
    <span className="mr-4 text-xl text-primary">جاري التحميل...</span>
  </div>
);