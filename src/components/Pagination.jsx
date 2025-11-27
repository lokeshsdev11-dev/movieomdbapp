import React from 'react';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-md hover:shadow-lg border-2 border-gray-200 disabled:border-gray-200"
      >
        ← Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
            currentPage === page
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white border-2 border-primary-600 transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary-300'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-md hover:shadow-lg border-2 border-gray-200 disabled:border-gray-200"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
