import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { SimilarMovie } from "../components/Movie";
import { Rating } from "../components/Rating";
import { Dot } from "lucide-react";
import Genres from "../components/Genre";
import { useLoading } from "../contexts/LoadingContext";
import Cast from "../components/Cast";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchMovieDetails = useRef();

  const options = {
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchMovieDetails.current = async () => {
    try {
      showLoading();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(async () => {
        const { data } = await axios.get(`${BASE_URL}/movie/${id}`, options);
        setMovieDetails(data);
        hideLoading();
      }, 1000);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      hideLoading();
    }
  };

  useEffect(() => {
    fetchMovieDetails.current();
  }, [id]);

  return (
    <>
      <div className="pt-16 md:pt-20 lg:pt-24">
        <div className="flex flex-col mx-auto pt-20 gap-2.5 px-4 md:px-8 md:pt-20 lg:pt-24 lg:px-16 xl:w-[82rem]">
          <p className="text-[#adadad] text-center tracking-widest font-bold text-xs">
            If current server doesn't work please try other servers below.
          </p>
          <iframe
            className="w-full aspect-video border border-[#320204]"
            src={`https://multiembed.mov/?video_id=${id}&tmdb=1`}
            allowFullScreen={true}
            title="Video Container"
          ></iframe>
        </div>
      </div>
      <div className="relative mt-20 lg:mt-40">
        <div className="md:hidden saturate-0">
          <img
            title={movieDetails.title || movieDetails.name}
            className="cursor-pointer w-full h-full"
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : "/no-image-portrait.svg"
            }
            alt={movieDetails.id}
          />
        </div>
        <div className="hidden md:flex saturate-0">
          <img
            title={movieDetails.title || movieDetails.name}
            className="cursor-pointer red w-full h-full"
            src={
              movieDetails.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
                : "/no-image-landscape.svg"
            }
            alt={movieDetails.id}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full half_shade flex items-center justify-center">
          <div className="items-center justify-center w-full h-auto transition-all px-4 md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
            <div className="mx-auto w-[8.3125rem] xs:w-[11.25rem] sm:w-[15rem] md:w-[9.5rem] md:h-[14.25rem] mb-4 md:mb-0 lg:w-[12.5rem] lg:h-[18.75rem] xl:w-[15rem] xl:h-[22.5rem]">
              <div className="flex flex-col items-center justify-center rounded-md md:w-[9.5rem] md:h-full lg:w-[12.5rem] lg:h-full xl:w-[15rem] xl:h-full">
                <img
                  title={movieDetails.title || movieDetails.name}
                  className="cursor-pointer w-full h-full rounded-md border border-[#320204]"
                  src={
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                      : "/no-image-portrait.svg"
                  }
                  alt={movieDetails.id}
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center md:w-[25.5rem] lg:w-lg xl:w-2xl">
              <h1 className="w-full text-center font-roboto font-black tracking-wider truncate text-[2rem] transition-all mb-4 md:mb-5 lg:mb-6 md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                {movieDetails.title || movieDetails.name}
              </h1>
              <div className="mb-4 md:mb-5 lg:mb-6">
                <p className="font-poppins flex items-center uppercase">
                  <span className="py-1 px-2.5 cursor-pointer border border-[#E50914] bg-[#490D0A] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
                    {dayjs(movieDetails.release_date).format("YYYY")}
                  </span>
                  <Dot color="#ffffff" />
                  {movieDetails.genres &&
                    movieDetails.genres.slice(0, 2).map((genre, idx, arr) => (
                      <span key={idx} className="flex items-center">
                        <span className="py-1 px-2.5 cursor-pointer border border-[#E50914] bg-[#490D0A] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
                          {genre.name}
                        </span>
                        {idx < arr.length - 1 && (
                          <span className="text-white">
                            <Dot color="#ffffff" />
                          </span>
                        )}
                      </span>
                    ))}
                </p>
              </div>
              <div className="flex flex-col gap-1 font-poppins mb-4 md:mb-5 lg:mb-6">
                <h3 className="tracking-widest font-extrabold uppercase text-xs xs:text-sm lg:text-sm">
                  Overview:
                </h3>
                <div className="w-full text-start text-wrap truncate line-clamp-2 text-xs tracking-wider transition-all md:line-clamp-4 lg:text-sm xl:line-clamp-6">
                  {movieDetails.overview}
                </div>
              </div>
              <div className="w-full flex justify-between gap-2.5">
                <div className="w-full flex flex-col gap-2.5 tracking-widest text-xs xs:text-sm lg:text-sm truncate">
                  <div className="flex gap-1 truncate">
                    <div className="font-extrabold uppercase">Status:</div>
                    {movieDetails.status}
                  </div>
                  <div className="flex gap-1 truncate">
                    <div className="font-extrabold uppercase">Duration:</div>
                    {movieDetails.runtime} mins
                  </div>
                  <div className="flex gap-1 truncate">
                    <div className="font-extrabold uppercase">Language:</div>
                    {movieDetails.spoken_languages?.[0]?.english_name ||
                      movieDetails.original_language}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2.5 tracking-widest text-xs xs:text-sm lg:text-sm truncate">
                  <div className="flex gap-1 truncate">
                    <div className="font-extrabold uppercase">Released:</div>
                    {dayjs(movieDetails.release_date).format("YYYY")}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="font-extrabold uppercase">Ratings:</div>
                    <Rating
                      rating={Number(movieDetails.vote_average).toFixed(1)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semibold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            CAST
          </h1>
          <Cast type="movie" />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semibold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            RELATED MOVIES
          </h1>
          <SimilarMovie />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semibold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            BROWSE BY GENRE
          </h1>
          <Genres />
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
