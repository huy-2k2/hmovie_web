import axios from "axios";
import React, { useEffect, useState } from "react";
import { getApiUrlByType } from "../helper";
import MovieCard from "./MovieCard";

export default function MovieList({ query, title, page = 1 }) {
  const [movies, setMovies] = useState();
  const [moving, setMoving] = useState(false);
  useEffect(() => {
    axios
      .get(getApiUrlByType(query, page))
      .then(({ data: { results } }) => setMovies(results));
  }, [query, page]);
  function handleClickMove(type = 1) {
    if (movies) {
      setMoving(type);
      setTimeout(() => {
        let moviesTemp = JSON.parse(JSON.stringify(movies));
        if (type === 1) {
          moviesTemp.unshift(moviesTemp.pop());
        } else {
          moviesTemp.push(moviesTemp.shift());
        }
        setMovies(moviesTemp);
        setMoving(false);
      }, 200);
    }
  }
  return (
    <div className="relative flex flex-col overflow-x-hidden gap-y-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div
        className={`${
          !moving
            ? "translate-x-0"
            : moving === 1
            ? "translate-x-[320px] duration-200"
            : "-translate-x-[320px] duration-200"
        } flex max-w-full overflow-hidden gap-x-5`}
      >
        {movies &&
          movies.map((movie, index) => (
            <div className="flex-shrink-0 w-[300px]">
              <MovieCard movie={movie} key={index}></MovieCard>
            </div>
          ))}
      </div>
      <div
        onClick={() => handleClickMove()}
        className="absolute left-0 flex items-center justify-center w-16 h-16 text-3xl text-gray-700 -translate-y-1/2 bg-white rounded-full cursor-pointer bg-opacity-40 top-1/2"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div
        onClick={() => handleClickMove(-1)}
        className="absolute right-0 flex items-center justify-center w-16 h-16 text-3xl text-gray-700 -translate-y-1/2 bg-white rounded-full cursor-pointer bg-opacity-40 top-1/2"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
}
