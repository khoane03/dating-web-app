import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6 p-4 border-t">
      <button
        className="px-4 py-2 border rounded-md disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ❮
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-4 py-2 border rounded-md ${
            currentPage === num ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="px-4 py-2 border rounded-md disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ❯
      </button>
    </div>
  );
};

export default Pagination;
