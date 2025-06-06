import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TrailerCard } from "./Card";

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

    const firstMovieId = nowPlaying[0].id;

    const {
      data: { results: videoResults },
    } = await axios.get(`${BASE_URL}/movie/${firstMovieId}/videos`, options);

    setMovies(nowPlaying);
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
