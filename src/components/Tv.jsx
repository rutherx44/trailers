import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { LatestCard, MovieCard } from "./Card";

export const Tv = () => {
  const [shows, setShows] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchTrendingTv = useRef();

  const options = {
    params: {
      language: "en-US",
      include_image_language: "en",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchTrendingTv.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/tv/day`, options);

    // Fetch genres and English backdrops for each movie
    const showsDetailsPromises = results.map(async (item) => {
      const [detailsResponse, imagesResponse] = await Promise.all([
        axios.get(`${BASE_URL}/tv/${item.id}`, options),
        axios.get(`${BASE_URL}/tv/${item.id}/images?`, options),
      ]);

      const englishBackdrops = imagesResponse.data.backdrops || [];
      const firstBackdrop =
        englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

      return {
        ...item,
        genres: detailsResponse.data.genres || [],
        englishBackdrop: firstBackdrop
          ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
          : item.backdrop_path,
      };
    });

    const showsWithDetails = await Promise.all(showsDetailsPromises);
    setShows(showsWithDetails);
  };

  useEffect(() => {
    fetchTrendingTv.current();
  }, []);

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
          {shows.slice(0, 10).map((movie, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <MovieCard data={movie} num={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export const LatestTv = () => {
  const [latestShows, setLatestShows] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchLatestTv = useRef();

  const options = {
    params: {
      language: "en-US",
      include_image_language: "en",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchLatestTv.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/tv/popular`, options);

    // Fetch genres and English backdrops for each movie
    const showsDetailsPromises = results.map(async (item) => {
      const [detailsResponse, imagesResponse] = await Promise.all([
        axios.get(`${BASE_URL}/tv/${item.id}`, options),
        axios.get(`${BASE_URL}/tv/${item.id}/images?`, options),
      ]);

      const englishBackdrops = imagesResponse.data.backdrops || [];
      const firstBackdrop =
        englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

      return {
        ...item,
        genres: detailsResponse.data.genres || [],
        englishBackdrop: firstBackdrop
          ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
          : item.backdrop_path,
      };
    });

    const showsWithDetails = await Promise.all(showsDetailsPromises);
    setLatestShows(showsWithDetails);
  };

  useEffect(() => {
    fetchLatestTv.current();
  }, []);

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
          {latestShows.slice(0, 10).map((movie, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <LatestCard data={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
