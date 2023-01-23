import React, { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getApiUrlSearch } from "../helper";
import MovieCard from "../components/MovieCard";
import Paginate from "../components/Paginate";
export default function SearchPage() {
  const { searchValue } = useParams();
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    setMovies(null);
    axios.get(getApiUrlSearch(searchValue, page)).then(({ data }) => {
      setMovies(data.results);
      setTotalPage(data.total_pages);
    });
  }, [searchValue, page]);
  useEffect(() => {
    setPage(1);
    setTotalPage(null);
  }, [searchValue]);
  return (
    <AppLayout>
      <div className="w-[1400px] mx-auto max-w-full flex flex-col gap-y-5 px-3 py-5">
        <h3 className="text-2xl font-semibold text-white">
          Tìm kiếm "{searchValue}"
        </h3>
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
