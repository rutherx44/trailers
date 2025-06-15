import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { GenreContext } from "../contexts/GenreContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { HeroCard } from "./Card";

const Hero = () => {
  const [moviesBackdrop, setMoviesBackdrop] = useState([]);
  const genres = useContext(GenreContext);

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
    try {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/trending/all/day`, options);

      const movieDataPromises = results.map(async (item) => {
        const movieGenres = item.genre_ids
          .map((id) => genres.find((g) => g.id === id))
          .filter(Boolean);

        return {
          ...item,
          genres: movieGenres,
        };
      });

      const heroWithData = await Promise.all(movieDataPromises);
      setMoviesBackdrop(heroWithData);
    } catch (error) {
      console.error("Failed fetching trending movies:", error);
    }
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchMoviesBackdrop.current();
    }
  }, [genres]);

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
