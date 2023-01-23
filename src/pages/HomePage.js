import axios from "axios";
import React, { useEffect } from "react";
import MovieList from "../components/MovieList";
import AppLayout from "../layouts/AppLayout";
import { getApiUrlGenres } from "../helper";
import Banner from "../components/Banner";
export default function HomePage() {
  return (
    <AppLayout>
      <div className="">
        <div className="w-[1400px] mx-auto px-3 py-5 max-w-full flex flex-col gap-y-10">
          <div className="mt-5">
            <Banner></Banner>
          </div>
          <MovieList query="popular" title="Đang phổ biến"></MovieList>
          <MovieList query="upcoming" title="Ra mắt gần đây"></MovieList>
          <MovieList query="top_rated" title="Top đánh giá"></MovieList>
        </div>
      </div>
    </AppLayout>
  );
}
