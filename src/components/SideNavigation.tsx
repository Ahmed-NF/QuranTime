import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SideNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  onNext,
  onPrevious,
  disableNext,
  disablePrevious,
}) => {
  return (
    <>
      <div className="side-navigation right">
        <button
          onClick={onPrevious}
          disabled={disablePrevious}
          className="p-3 rounded-full bg-white shadow-lg text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[#1a4d2e]"
          title="السابق"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="side-navigation left">
        <button
          onClick={onNext}
          disabled={disableNext}
          className="p-3 rounded-full bg-white shadow-lg text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[#1a4d2e]"
          title="التالي"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </>
  );
};