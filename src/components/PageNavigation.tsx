import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PageNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
  isTransitioning: boolean;
  isFocusMode?: boolean;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  onNext,
  onPrevious,
  disableNext,
  disablePrevious,
  isTransitioning,
  isFocusMode = false,
}) => {
  return (
    <>
      <div className={`fixed inset-y-0 right-0 flex items-center px-2 sm:px-4 pointer-events-none transition-all duration-300 ${
        isFocusMode ? 'opacity-90 hover:opacity-100' : 'opacity-100'
      }`}>
        <button
          onClick={onPrevious}
          disabled={disablePrevious || isTransitioning}
          className={`navigation-button group pointer-events-auto ${
            isFocusMode ? 'focus-navigation-button' : ''
          }`}
          title="الصفحة السابقة"
        >
          <div className="navigation-hint right-full">الصفحة السابقة</div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className={`fixed inset-y-0 left-0 flex items-center px-2 sm:px-4 pointer-events-none transition-all duration-300 ${
        isFocusMode ? 'opacity-90 hover:opacity-100' : 'opacity-100'
      }`}>
        <button
          onClick={onNext}
          disabled={disableNext || isTransitioning}
          className={`navigation-button group pointer-events-auto ${
            isFocusMode ? 'focus-navigation-button' : ''
          }`}
          title="الصفحة التالية"
        >
          <div className="navigation-hint left-full">الصفحة التالية</div>
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </>
  );
};