import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Select from '../ui/Select';

const ExpensePagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      <div className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-800">{startItem}</span> - <span className="font-medium text-slate-800">{endItem}</span> of <span className="font-medium text-slate-800">{totalItems}</span> expenses
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-slate-200 rounded-lg text-sm px-2 py-1 outline-none focus:border-teal-500 bg-white"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 h-8 w-8 !rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1">
            {getPageNumbers().map(page => (
              <Button
                key={page}
                variant={page === currentPage ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 !rounded-lg p-0 font-medium ${page !== currentPage ? 'text-slate-600' : ''}`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 h-8 w-8 !rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpensePagination;
