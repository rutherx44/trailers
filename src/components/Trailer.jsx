import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TrailerCard } from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const Trailer = () => {
  const [movies, setMovies] = useState([]);
  const [videos, setVideos] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchVideo = useRef();

  const options = {
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchVideo.current = async () => {
    const {
      data: { results: nowPlaying },
    } = await axios.get(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
      options
    );

    if (nowPlaying.length === 0) return;

    // Pick one random movie
    const randomMovie =
      nowPlaying[Math.floor(Math.random() * nowPlaying.length)];

    // Fetch videos for the random movie
    const {
      data: { results: videoResults },
    } = await axios.get(`${BASE_URL}/movie/${randomMovie.id}/videos`, options);

    // Only set the random movie in the state
    setMovies([randomMovie]); // Note the brackets to keep it an array
    setVideos(videoResults);
  };

  useEffect(() => {
    fetchVideo.current();
  }, []);

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16">
        <div>
          {movies.slice(0, 1).map((movie, idx) => (
            <div
              key={idx}
              className="w-full h-full flex justify-center cursor-pointer transition-all"
            >
              <TrailerCard data={movie} videos={videos} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trailer;
