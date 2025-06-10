import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { GenreContext } from "../contexts/GenreContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { TopMovieCard, MovieCard } from "./Card";

export const Movie = () => {
  const [movies, setMovies] = useState([]);
  const genres = useContext(GenreContext);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchTrendingMovie = useRef();

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

  fetchTrendingMovie.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/movie/day`, options);

    // Fetch genres and English backdrops for each movie
    const movieDetailsPromises = results.map(async (item) => {
      const imagesResponse = await axios.get(
        `${BASE_URL}/movie/${item.id}/images?`,
        options
      );

      const englishBackdrops = imagesResponse.data.backdrops || [];
      const firstBackdrop =
        englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

      const movieGenres = item.genre_ids
        .map((id) => genres.find((g) => g.id === id))
        .filter(Boolean);

      return {
        ...item,
        genres: movieGenres,
        englishBackdrop: firstBackdrop
          ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
          : item.backdrop_path,
      };
    });

    const moviesWithDetails = await Promise.all(movieDetailsPromises);
    setMovies(moviesWithDetails);
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchTrendingMovie.current();
    }
  }, [genres]);

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
          {movies.slice(0, 10).map((movie, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link to={`/movie/${movie.id}`}>
                <TopMovieCard data={movie} num={idx} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export const LatestMovie = () => {
  const [latestMovie, setLatestMovie] = useState([]);
  const genres = useContext(GenreContext);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchLatestMovie = useRef();

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

  fetchLatestMovie.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/movie/popular`, options);

    // Fetch genres and English backdrops for each movie
    const movieDetailsPromises = results.map(async (item) => {
      const imagesResponse = await axios.get(
        `${BASE_URL}/movie/${item.id}/images?`,
        options
      );

      const englishBackdrops = imagesResponse.data.backdrops || [];
      const firstBackdrop =
        englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

      const movieGenres = item.genre_ids
        .map((id) => genres.find((g) => g.id === id))
        .filter(Boolean);

      return {
        ...item,
        genres: movieGenres,
        englishBackdrop: firstBackdrop
          ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
          : item.backdrop_path,
      };
    });

    const moviesWithDetails = await Promise.all(movieDetailsPromises);
    setLatestMovie(moviesWithDetails);
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchLatestMovie.current();
    }
  }, [genres]);

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
          {latestMovie.slice(0, 10).map((movie, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link to={`/movie/${movie.id}`}>
                <MovieCard data={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export const SimilarMovie = () => {
  const [similarMovie, setSimilarMovie] = useState([]);
  const { id } = useParams();
  const genres = useContext(GenreContext);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchSimilarMovie = useRef();

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

  fetchSimilarMovie.current = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/movie/${id}/similar?`, options);

    // Fetch genres and English backdrops for each movie
    const movieDetailsPromises = results.map(async (item) => {
      const imagesResponse = await axios.get(
        `${BASE_URL}/movie/${item.id}/images?`,
        options
      );

      const englishBackdrops = imagesResponse.data.backdrops || [];
      const firstBackdrop =
        englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

      const movieGenres = item.genre_ids
        .map((id) => genres.find((g) => g.id === id))
        .filter(Boolean);

      return {
        ...item,
        genres: movieGenres,
        englishBackdrop: firstBackdrop
          ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
          : item.backdrop_path,
      };
    });

    const moviesWithDetails = await Promise.all(movieDetailsPromises);
    setSimilarMovie(moviesWithDetails);
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchSimilarMovie.current();
    }
  }, [id, genres]);

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
          {similarMovie.slice(0, 10).map((movie, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link to={`/movie/${movie.id}`}>
                <MovieCard data={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
