import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function InputSearch() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const searchTemp = search;
    if (searchTemp.trim()) {
      navigate(`/search/${search}`);
      setSearch("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex relative text-gray-300 border border-gray-300 rounded-md w-full items-center justify-start py-[2px]"
    >
      <div className="absolute -translate-y-1/2 left-2 top-1/2">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Nhập tên phim..."
        className="flex-grow px-2 py-1 ml-6 bg-transparent border-none outline-none"
      />
      <button
        type="submit"
        className="w-[60px] h-full text-center bg-primary text-white rounded-sm mr-1 text-lg flex-shrink-0"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
