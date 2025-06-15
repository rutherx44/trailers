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

export const Tv = () => {
  const [shows, setShows] = useState([]);
  const genres = useContext(GenreContext);

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
    try {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/trending/tv/day`, options);

      const showsDetailsPromises = results.map(async (item) => {
        try {
          const imagesResponse = await axios.get(
            `${BASE_URL}/tv/${item.id}/images`,
            options
          );
          const englishBackdrops = imagesResponse.data.backdrops || [];
          const firstBackdrop =
            englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

          const movieGenres = item.genre_ids
            .map((id) => genres.find((g) => g.id === id))
            .filter(Boolean);

          const { data: tvDetails } = await axios.get(
            `${BASE_URL}/tv/${item.id}`,
            options
          );

          return {
            ...item,
            genres: movieGenres,
            englishBackdrop: firstBackdrop
              ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
              : item.backdrop_path,
            seasons: tvDetails.seasons || [],
          };
        } catch (innerError) {
          console.error(
            `Error fetching details for show ${item.id}:`,
            innerError
          );
        }
      });

      const showsWithDetails = await Promise.all(showsDetailsPromises);
      setShows(showsWithDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchTrendingTv.current();
    }
  }, [genres]);

  return (
    <>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={"auto"}
          spaceBetween={10}
          loop={true}
          pagination={true}
          navigation
          className="swiper-carousel"
        >
          {shows.slice(0, 10).map((shows, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link
                to={`/tv/${shows.id}/season/${shows.seasons[0].season_number}`}
              >
                <TopMovieCard data={shows} num={idx} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export const LatestTv = () => {
  const [latestShows, setLatestShows] = useState([]);
  const genres = useContext(GenreContext);

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
    try {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/tv/top_rated`, options);

      const showsDetailsPromises = results.map(async (item) => {
        try {
          const imagesResponse = await axios.get(
            `${BASE_URL}/tv/${item.id}/images`,
            options
          );
          const englishBackdrops = imagesResponse.data.backdrops || [];
          const firstBackdrop =
            englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

          const movieGenres = item.genre_ids
            .map((id) => genres.find((g) => g.id === id))
            .filter(Boolean);

          const { data: tvDetails } = await axios.get(
            `${BASE_URL}/tv/${item.id}`,
            options
          );

          return {
            ...item,
            genres: movieGenres,
            englishBackdrop: firstBackdrop
              ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
              : item.backdrop_path,
            seasons: tvDetails.seasons || [],
          };
        } catch (innerError) {
          console.error(
            `Error fetching details for show ${item.id}:`,
            innerError
          );
        }
      });

      const showsWithDetails = await Promise.all(showsDetailsPromises);
      setLatestShows(showsWithDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchLatestTv.current();
    }
  }, [genres]);

  return (
    <>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={"auto"}
          spaceBetween={10}
          loop={true}
          pagination={true}
          navigation
          className="swiper-carousel"
        >
          {latestShows.slice(0, 10).map((shows, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link
                to={`/tv/${shows.id}/season/${shows.seasons[0].season_number}`}
              >
                <MovieCard data={shows} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export const SimilarTv = () => {
  const [similarShows, setSimilarShows] = useState([]);
  const { id } = useParams();
  const genres = useContext(GenreContext);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchSimilarShows = useRef();

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

  fetchSimilarShows.current = async () => {
    try {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/tv/${id}/recommendations?`, options);

      const showsDetailsPromises = results.map(async (item) => {
        try {
          const imagesResponse = await axios.get(
            `${BASE_URL}/tv/${item.id}/images`,
            options
          );
          const englishBackdrops = imagesResponse.data.backdrops || [];
          const firstBackdrop =
            englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

          const movieGenres = item.genre_ids
            .map((id) => genres.find((g) => g.id === id))
            .filter(Boolean);

          const { data: tvDetails } = await axios.get(
            `${BASE_URL}/tv/${item.id}`,
            options
          );

          return {
            ...item,
            genres: movieGenres,
            englishBackdrop: firstBackdrop
              ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
              : item.backdrop_path,
            seasons: tvDetails.seasons || [],
          };
        } catch (innerError) {
          console.error(
            `Error fetching details for show ${item.id}:`,
            innerError
          );
        }
      });

      const showsWithDetails = await Promise.all(showsDetailsPromises);
      setSimilarShows(showsWithDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching related TV shows:", error);
    }
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchSimilarShows.current();
    }
  }, [id, genres]);

  return (
    <>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={"auto"}
          spaceBetween={10}
          loop={true}
          pagination={true}
          navigation
          className="swiper-carousel"
        >
          {similarShows.slice(0, 10).map((shows, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link
                to={`/tv/${shows.id}/season/${shows.seasons[0].season_number}`}
              >
                <MovieCard data={shows} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
