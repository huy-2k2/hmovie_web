import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../contexts/CategoriesContext";
import { getImageUrl } from "../helper";

export default function BannerItem({ movie }) {
  const [categories] = useCategories();
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="w-full h-[350px] md:h-[450px]">
        <img
          className="object-cover w-full h-full"
          src={getImageUrl(movie.backdrop_path)}
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bottom-0 left-0 z-10 flex flex-col items-start p-5 gap-y-5">
        <h3 className="text-xl font-semibold text-white md:text-3xl">
          {movie.title}
        </h3>
        <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-3">
          {categories &&
            categories
              .filter((category) => movie.genre_ids.includes(category.id))
              .map((category) => (
                <span className="px-2 py-1 text-xs font-semibold text-white bg-transparent border border-white rounded-md md:text-base md:px-5 md:py-3">
                  {category.name}
                </span>
              ))}
        </div>
        <Link
          to={`/detail/${movie.id}`}
          className="flex items-center justify-center px-5 py-2 rounded-md bg-primary gap-x-3"
        >
          <span className="font-semibold text-white">Watch Now</span>
          <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-primary">
            <i class="fa-solid fa-play ml-[2px]"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}
