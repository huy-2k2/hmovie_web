import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Paginate from "../components/Paginate";
import { getApiUrlByGenre } from "../helper";
import AppLayout from "../layouts/AppLayout";
export default function GenrePage() {
  const { genreId, genreName } = useParams();
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    axios.get(getApiUrlByGenre(genreId, page)).then(({ data }) => {
      setTotalPage(data.total_pages);
      setMovies(data.results);
    });
  }, [genreId, page]);

  useEffect(() => {
    setPage(1);
    setMovies(null);
    setTotalPage(null);
  }, [genreId]);

  useEffect(() => {
    setMovies(null);
    setTotalPage(null);
  }, [page]);
  return (
    <AppLayout>
      <div className="w-[1400px] mx-auto max-w-full px-3 py-5 flex flex-col gap-y-5">
        <h3 className="text-lg font-semibold text-white">{genreName}</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {movies &&
            movies.map((movie) => (
              <div>
                <MovieCard movie={movie}></MovieCard>
              </div>
            ))}
        </div>
        <Paginate
          page={page}
          totalPage={totalPage}
          setPage={setPage}
        ></Paginate>
      </div>
    </AppLayout>
  );
}
