import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg bg-[#1a4d2e] text-white disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
      
      <span className="mx-4">
        صفحة {currentPage} من {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg bg-[#1a4d2e] text-white disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
    </div>
  );
};