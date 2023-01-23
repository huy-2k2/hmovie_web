import React from "react";
import { getImageUrl } from "../helper";
import { Link } from "react-router-dom";
export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/detail/${movie.id}`}
      className="relative w-full cursor-pointer group"
    >
      <div className="w-full">
        <img
          className="object-cover w-full h-auto"
          src={getImageUrl(movie.poster_path)}
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="flex flex-col items-start p-2 gap-y-3">
          <div className="relative px-2 py-[1px] text-sm font-semibold text-white bg-primary flex gap-x-2">
            <span>Ra mắt:</span>
            <span>{movie.release_date}</span>
            <span className="absolute left-full top-0 border-[11.4px] border-transparent border-l-primary"></span>
          </div>
          <div className="relative px-2 py-[1px] text-sm font-semibold text-white bg-primary flex gap-x-4">
            <span className="flex items-center text-yellow-400 gap-x-1">
              <span className="text-white">{movie.vote_average}</span>
              <i class="fa-solid fa-star"></i>
            </span>
            <span>{movie.vote_count} đánh giá</span>
            <span className="absolute top-0 border-[11.4px] border-transparent left-full border-l-primary"></span>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center w-16 h-16 text-3xl text-gray-300 duration-100 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 bg-primary bg-opacity-40 top-1/2 left-1/2">
        <i class="fa-solid fa-play scale-125 ml-2"></i>
      </div>
    </Link>
  );
}
