import React from 'react';

/**
 * Generic, windowed pagination component with internal state.
 *
 * Props
 * -----
 * data            : array   – the full data set
 * perPageData     : number  – rows per page
 * maxPageButtons  : number  – how many page buttons to show (default 5)
 * style           : object  – optional inline-style override
 * onPageChange    : fn      – optional callback(pageNumber) when page changes
 */
const PaginationNew = ({
  data,
  perPageData,
  maxPageButtons,
  style = {},
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  let maxPageButtonsFinal;

  if (!maxPageButtons) {
    maxPageButtonsFinal = 10;
  }

  const totalPages = Math.ceil(data.length / perPageData);

  // No pagination needed
  if (totalPages <= 1) return null;

  /* ---------- helpers ---------- */
  const goTo = (page) => {
    const newPage = Math.min(Math.max(page, 0), totalPages - 1);
    setCurrentPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const visiblePages = (() => {
    const half = Math.floor(maxPageButtonsFinal / 2);
    let start = Math.max(currentPage - half, 0);
    let end = Math.min(start + maxPageButtonsFinal - 1, totalPages - 1);

    // shift window if we’re close to the end
    if (end - start < maxPageButtonsFinal - 1) {
      start = Math.max(end - maxPageButtonsFinal + 1, 0);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  /* ---------- markup ---------- */
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap" style={style}>
      <button
        className="button-primary button-sm px-3 py-2"
        disabled={currentPage === 0}
        onClick={() => goTo(currentPage - 1)}
      >
        Prev
      </button>

      {visiblePages[0] > 0 && <span>…</span>}

      {visiblePages.map((p) => (
        <button
          key={p}
          className={`btn btn-sm ${
            p === currentPage ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => {
            if (p !== currentPage) goTo(p);
          }}
        >
          {p + 1}
        </button>
      ))}

      {visiblePages.at(-1) < totalPages - 1 && <span>…</span>}

      <button
        className="button-primary button-sm px-3 py-2"
        disabled={currentPage === totalPages - 1}
        onClick={() => goTo(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationNew;
