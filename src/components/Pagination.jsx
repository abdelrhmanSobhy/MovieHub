import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, setPage, totalPages }) => {
  const visiblePages = 3; // بدل 5
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center gap-2 p-6 bg-[#0b0b10]">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className={`p-2 bg-white/10 text-white rounded-lg shadow hover:bg-white/20 
          ${page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* لو انا مش في اول صفحة قوي */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-3 py-1 rounded-lg shadow ${
              page === 1
                ? "bg-yellow-400 text-black"
                : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            }`}
          >
            1
          </button>
          <span className="px-2 text-white">...</span>
        </>
      )}

      {/* الأرقام اللي في النص */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-3 py-1 rounded-lg shadow ${
            p === page
              ? "bg-yellow-400 text-black"
              : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
          }`}
        >
          {p}
        </button>
      ))}

      {/* لو انا مش في اخر صفحة قوي */}
      {endPage < totalPages && (
        <>
          <span className="px-2 text-white">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 rounded-lg shadow ${
              page === totalPages
                ? "bg-yellow-400 text-black"
                : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={`p-2 bg-white/10 text-white rounded-lg shadow hover:bg-white/20 
          ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
