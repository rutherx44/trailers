import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { HeroCard } from "./Card";

const Hero = () => {
  const [moviesBackdrop, setMoviesBackdrop] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchMoviesBackdrop = useRef(() => {});

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
  fetchMoviesBackdrop.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/all/day`, options);

    // Fetch genres and English backdrops
    const movieDataPromises = results.map(async (item) => {
      const type = item.media_type; // 'movie' or 'tv'

      const [{ data: details }, { data: images }] = await Promise.all([
        axios.get(`${BASE_URL}/${type}/${item.id}`, options),
        axios.get(`${BASE_URL}/${type}/${item.id}/images`, options),
      ]);

      const englishBackdrop = images.backdrops?.find(
        (img) => img.iso_639_1 === "en"
      );

      return {
        ...item,
        genres: details.genres || [],
        backdrop_path: englishBackdrop?.file_path || item.backdrop_path,
      };
    });

    const heroWithData = await Promise.all(movieDataPromises);
    setMoviesBackdrop(heroWithData);
  };

  useEffect(() => {
    fetchMoviesBackdrop.current();
  }, []);

  return (
    <>
      <div>
        <Swiper
          loop={true}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {moviesBackdrop.map((movie, idx) => (
            <SwiperSlide key={idx} className="mt-16 md:mt-20 lg:mt-24">
              <HeroCard data={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;
