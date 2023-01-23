import axios from "axios";
import React, { useEffect, useState } from "react";
import { getApiUrlByType } from "../helper";
import BannerItem from "./BannerItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper";
export default function Banner() {
  const [movies, setMovies] = useState();
  useEffect(() => {
    axios
      .get(getApiUrlByType("popular"))
      .then(({ data: { results } }) => setMovies(results.slice(0, 5)));
  }, []);
  return (
    <div className="w-full">
      {movies && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
        >
          {movies.map((movie) => (
            <SwiperSlide>
              <BannerItem movie={movie}></BannerItem>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
