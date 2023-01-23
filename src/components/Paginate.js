import React from "react";

export default function Paginate({ page, setPage, totalPage }) {
  function handlePaginate(direct) {
    if ((page >= totalPage && direct === 1) || (page <= 1 && direct === -1));
    else setPage(page + direct);
  }
  return (
    <div className="flex items-stretch justify-center h-10">
      <span
        onClick={() => handlePaginate(-1)}
        className={`${
          page <= 1 ? "hidden" : "flex"
        } items-center justify-center w-10 text-2xl text-white bg-opacity-50 cursor-pointer hover:bg-opacity-80 bg-primary`}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </span>
      <span className="flex items-center justify-center w-12 text-2xl font-semibold text-white">
        {page}
      </span>
      <span
        onClick={() => handlePaginate(1)}
        className={`${
          page >= totalPage ? "hidden" : "flex"
        }  items-center justify-center w-10 text-2xl text-white bg-opacity-50 cursor-pointer hover:bg-opacity-80 bg-primary`}
      >
        <i class="fa-solid fa-chevron-right"></i>
      </span>
    </div>
  );
}
