import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GenreCard } from "./Card";

const Genres = () => {
  const [genres, setGenres] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchGenres = useRef();

  const options = {
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchGenres.current = async () => {
    const [movieRes, tvRes] = await Promise.all([
      axios.get(`${BASE_URL}/genre/movie/list?`, options),
      axios.get(`${BASE_URL}/genre/tv/list?`, options),
    ]);

    const movieData = await movieRes.data;
    const tvData = await tvRes.data;

    const combined = [...movieData.genres, ...tvData.genres];
    const uniqueGenres = Array.from(
      new Map(combined.map((genre) => [genre.id, genre])).values()
    );

    setGenres(uniqueGenres);
  };

  useEffect(() => {
    fetchGenres.current();
  }, []);

  const gradientClasses = [
    "bg-gradient-to-bl from-[#60EFFF] to-[#0061FF]",
    "bg-gradient-to-bl from-[#F4F269] to-[#5CB270]",
    "bg-gradient-to-bl from-[#F89B29] to-[#FF0F7B]",
    "bg-gradient-to-bl from-[#F8ACFF] to-[#696EFF]",
    "bg-gradient-to-bl from-[#FFF95B] to-[#FF930F]",
    "bg-gradient-to-bl from-[#EDE342] to-[#FF51EB]",
    "bg-gradient-to-bl from-[#F9BC2C] to-[#F74C06]",
    "bg-gradient-to-bl from-[#83D0CB] to-[#145277]",
    "bg-gradient-to-bl from-[#FCB0F3] to-[#3D05DD]",
    "bg-gradient-to-bl from-[#EF709B] to-[#FF0000]",
  ];

  return (
    <>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={2}
          spaceBetween={10}
          loop={true}
          pagination={true}
          breakpoints={{
            520: { slidesPerView: 4 },
            768: { slidesPerView: 5, spaceBetween: 12 },
            1024: { slidesPerView: 6, spaceBetween: 14 },
            1280: { slidesPerView: 7, spaceBetween: 16 },
          }}
          navigation
          className="swiper-carousel"
        >
          {genres
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 10)
            .map((genre, idx) => {
              const gradientClass =
                gradientClasses[idx % gradientClasses.length];

              return (
                <SwiperSlide
                  key={idx}
                  className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
                >
                  <GenreCard data={genre} gradientClass={gradientClass} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default Genres;
