import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { SimilarMovie } from "../components/Movie";
import { LatestTv } from "../components/Tv";
import { Rating } from "../components/Rating";
import { Dot } from "lucide-react";
import Genres from "../components/Genre";

const TvDetails = () => {
  const [tvDetails, setTvDetails] = useState({});
  const { id } = useParams();

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchTvDetails = useRef(() => {});

  const options = {
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchTvDetails.current = async () => {
    const { data } = await axios.get(`${BASE_URL}/tv/${id}`, options);
    setTvDetails(data);
  };

  useEffect(() => {
    fetchTvDetails.current();
  }, []);

  return (
    <>
      <div className="pt-16 md:pt-20 lg:pt-24">
        <div className="flex flex-col mx-auto pt-20 gap-2.5 px-4 md:px-8 md:pt-20 lg:pt-24 lg:px-16 xl:w-[82rem]">
          <p className="text-[#adadad] text-center tracking-widest font-bold text-xs">
            If current server doesn't work please try other servers below.
          </p>
          <iframe
            className="w-full aspect-video"
            src={`https://multiembed.mov/?video_id=${id}&tmdb=1`}
            allowFullScreen={true}
            title="Video Container"
          ></iframe>
        </div>
      </div>
      <div className="relative mt-20 lg:mt-40">
        <div className="md:hidden saturate-0 backdrop-opacity-70">
          <img
            title={tvDetails.title || tvDetails.name}
            className="cursor-pointer bg-black/70 w-full h-full"
            src={
              tvDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`
                : "/no-image-portrait.svg"
            }
            alt={tvDetails.id}
          />
        </div>
        <div className="hidden md:flex saturate-0 backdrop-opacity-70">
          <img
            title={tvDetails.title || tvDetails.name}
            className="cursor-pointer backdrop-grayscale-100 w-full h-full"
            src={
              tvDetails.backdrop_path
                ? `https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`
                : "/no-image-landscape.svg"
            }
            alt={tvDetails.id}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full half_shade flex items-center justify-center">
          <div className="items-center justify-center w-full h-auto transition-all px-4 md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
            <div className="mx-auto w-[8.3125rem] xs:w-[11.25rem] sm:w-[15rem] md:w-[9.5rem] md:h-[14.25rem] mb-4 md:mb-0 lg:w-[12.5rem] lg:h-[18.75rem] xl:w-[15rem] xl:h-[22.5rem]">
              <div className="flex flex-col items-center justify-center rounded-md md:w-[9.5rem] md:h-full lg:w-[12.5rem] lg:h-full xl:w-[15rem] xl:h-full">
                <img
                  title={tvDetails.title || tvDetails.name}
                  className="cursor-pointer w-full h-full rounded-md"
                  src={
                    tvDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`
                      : "/no-image-portrait.svg"
                  }
                  alt={tvDetails.id}
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center md:w-[25.5rem] lg:w-lg xl:w-2xl">
              <h1 className="w-full text-center font-roboto font-black tracking-wider truncate text-[2rem] transition-all mb-4 md:mb-5 lg:mb-6 md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                {tvDetails.title || tvDetails.name}
              </h1>
              <div className="mb-4 md:mb-5 lg:mb-6">
                <p className="font-poppins flex items-center uppercase">
                  <span className="py-1 px-2.5 cursor-pointer border border-[#E50914] bg-[#490D0A] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
                    {dayjs(tvDetails.release_date).format("YYYY")}
                  </span>
                  <Dot />
                  {tvDetails.genres &&
                    tvDetails.genres.slice(0, 2).map((genre, idx, arr) => (
                      <span key={idx} className="flex items-center">
                        <span className="py-1 px-2.5 cursor-pointer border border-[#E50914] bg-[#490D0A] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
                          {genre.name}
                        </span>
                        {idx < arr.length - 1 && (
                          <span className="text-white">
                            <Dot />
                          </span>
                        )}
                      </span>
                    ))}
                </p>
              </div>
              <div className="flex flex-col gap-1 font-poppins mb-4 md:mb-5 lg:mb-6">
                <h3 className="tracking-widest font-extrabold uppercase text-xs xs:text-sm lg:text-sm">
                  Overview :
                </h3>
                <p className="w-full text-start text-wrap truncate line-clamp-2 text-xs tracking-wider transition-all md:line-clamp-4 lg:text-sm xl:line-clamp-6">
                  {tvDetails.overview}
                </p>
              </div>
              <div className="w-full flex justify-between gap-2.5">
                <div className="w-full flex flex-col gap-2.5 tracking-widest text-xs xs:text-sm lg:text-sm truncate">
                  <p className="flex gap-1 truncate">
                    <p className="font-extrabold uppercase">Status :</p>
                    {tvDetails.status}
                  </p>
                  <p className="flex gap-1 truncate">
                    <p className="font-extrabold uppercase">Duration :</p>
                    {tvDetails.runtime} mins
                  </p>
                  <p className="flex gap-1 truncate">
                    <p className="font-extrabold uppercase">Language :</p>
                    {tvDetails.spoken_languages?.[0]?.english_name ||
                      tvDetails.original_language}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-2.5 tracking-widest text-xs xs:text-sm lg:text-sm truncate">
                  <p className="flex gap-1 truncate">
                    <p className="font-extrabold uppercase">Released :</p>
                    {dayjs(tvDetails.release_date).format("YYYY")}
                  </p>
                  <p className="flex items-center gap-1">
                    <p className="font-extrabold uppercase">Ratings :</p>
                    <Rating
                      rating={Number(tvDetails.vote_average).toFixed(1)}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-20 flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semibold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            RELATED TV SHOWS
          </h1>
          <LatestTv id={id} />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semibold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            RELATED MOVIES
          </h1>
          <SimilarMovie id={id} />
        </div>
      </section>
      <section className="mt-20 lg:mt-40 flex flex-col gap-10 lg:gap-20">
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

export default TvDetails;
