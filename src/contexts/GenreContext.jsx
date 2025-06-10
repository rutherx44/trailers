// src/context/GenreContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;

  const options = {
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const [movieRes, tvRes] = await Promise.all([
        axios.get(`${BASE_URL}/genre/movie/list?`, options),
        axios.get(`${BASE_URL}/genre/tv/list?`, options),
      ]);

      const movieData = movieRes.data.genres;
      const tvData = tvRes.data.genres;

      const combined = [...movieData, ...tvData];
      const uniqueGenres = Array.from(
        new Map(combined.map((genre) => [genre.id, genre])).values()
      );

      setGenres(uniqueGenres);
    };

    fetchGenres();
  }, []);

  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  );
};
