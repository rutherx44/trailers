import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MovieCard } from "./Card";

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchTrendingMovie = useRef();

  const options = {
    params: {
      language: "en-US",
      include_image_language: "en,null",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchTrendingMovie.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    setMovies(results);
    console.log(results);
  };

  useEffect(() => {
    fetchTrendingMovie.current();
  }, []);

  return (
    <>
      <div className="mt-20 flex flex-col gap-4 md:px-8 lg:px-16">
        <div className="h-auto font-poppins flex gap-2 px-4 pb-5">
          <div className="w-1 bg-[#E50914]"></div>
          <h2 className="text-lg lg:text-xl xl:text-2xl">TOP 10 MOVIES</h2>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={2}
            loop={true}
            pagination={true}
            breakpoints={{
              520: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
              1536: { slidesPerView: 7 },
            }}
            navigation
            className="swiper-carousel"
          >
            {movies.slice(0, 10).map((movie, idx) => (
              <SwiperSlide key={idx} className="w-fit! pl-2.5 cursor-pointer">
                <MovieCard data={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Carousel;
