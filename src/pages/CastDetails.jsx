import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useLoading } from "../contexts/LoadingContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MovieCard } from "../components/Card";
import { GenreContext } from "../contexts/GenreContext";
import { LatestMovie } from "../components/Movie";
import Genres from "../components/Genre";
import { LatestTv } from "../components/Tv";

const CastDetails = () => {
  const [castDetails, setCastDetails] = useState({});
  const [castMovie, setCastMovie] = useState([]);
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const genres = useContext(GenreContext);

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchCastDetails = useRef();

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

  const getGender = (genderId) => {
    switch (genderId) {
      case 0:
        return "Not set / Not specified";
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
      default:
        return "Unknown";
    }
  };

  fetchCastDetails.current = async () => {
    try {
      showLoading();
      window.scrollTo({ top: 0, behavior: "smooth" });

      const { data: castInfo } = await axios.get(
        `${BASE_URL}/person/${id}`,
        options
      );
      setCastDetails(castInfo);

      const {
        data: { cast },
      } = await axios.get(`${BASE_URL}/person/${id}/combined_credits`, options);

      const castWithDetails = await Promise.all(
        cast.map(async (movie) => {
          try {
            let englishBackdrop = null;

            if (movie.media_type === "movie") {
              const imagesResponse = await axios.get(
                `${BASE_URL}/movie/${movie.id}/images`,
                options
              );
              const englishBackdrops = imagesResponse.data.backdrops || [];
              englishBackdrop =
                englishBackdrops.length > 0
                  ? englishBackdrops[0].file_path
                  : null;
            } else if (movie.media_type === "tv") {
              const imagesResponse = await axios.get(
                `${BASE_URL}/tv/${movie.id}/images`,
                options
              );
              const englishBackdrops = imagesResponse.data.backdrops || [];
              englishBackdrop =
                englishBackdrops.length > 0
                  ? englishBackdrops[0].file_path
                  : null;
            }

            const movieGenres = movie.genre_ids
              .map((id) => genres.find((g) => g.id === id))
              .filter(Boolean);

            return {
              ...movie,
              genres: movieGenres,
              englishBackdrop: englishBackdrop
                ? `https://image.tmdb.org/t/p/original${englishBackdrop}`
                : movie.backdrop_path
                ? movie.backdrop_path
                : null,
            };
          } catch (error) {
            console.error("Error fetching movie or TV show details:", error);
            return {
              ...movie,
              genres: [],
              englishBackdrop: movie.backdrop_path,
            };
          }
        })
      );

      setCastMovie(castWithDetails);
      hideLoading();
    } catch (error) {
      console.error("Error fetching cast details:", error);
      hideLoading();
    }
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchCastDetails.current();
    }
  }, [id, genres]);

  return (
    <>
      <div className="w-full h-hull flex items-center justify-center pt-20 mt-16 md:mt-20 lg:mt-24">
        <div className="items-center justify-center w-full h-auto transition-all px-4 md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
          <div className="mx-auto w-[8.3125rem] xs:w-[11.25rem] sm:w-[15rem] md:w-[9.5rem] md:h-[14.25rem] mb-4 md:mb-0 lg:w-[12.5rem] lg:h-[18.75rem] xl:w-[15rem] xl:h-[22.5rem]">
            <div className="flex flex-col items-center justify-center rounded-md md:w-[9.5rem] md:h-full lg:w-[12.5rem] lg:h-full xl:w-[15rem] xl:h-full">
              <img
                title={castDetails.name || "No Title"}
                className="cursor-pointer w-full h-full rounded-md"
                src={
                  castDetails.profile_path
                    ? `https://image.tmdb.org/t/p/w500${castDetails.profile_path}`
                    : "/no-image-portrait.svg"
                }
                alt={castDetails.name || "No Image"}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center md:w-[25.5rem] lg:w-lg xl:w-2xl">
            <h1 className="w-full text-center font-roboto font-black tracking-wider truncate text-[2rem] transition-all mb-4 md:mb-5 lg:mb-6 md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
              {castDetails.name || "No Name"}
            </h1>
            <div className="flex flex-col gap-1 font-poppins mb-4 md:mb-5 lg:mb-6">
              <h3 className="tracking-widest font-extrabold uppercase text-xs xs:text-sm lg:text-sm">
                Biography:
              </h3>
              <div className="w-full text-start text-wrap truncate line-clamp-2 text-xs tracking-wider transition-all md:line-clamp-4 lg:text-sm xl:line-clamp-6">
                {castDetails.biography || "No biography available."}
              </div>
            </div>
            <div className="w-full flex justify-between gap-2.5">
              <div className="w-full flex flex-col gap-2.5 tracking-widest text-xs xs:text-sm lg:text-sm truncate">
                <div className="flex items-center gap-1">
                  <div className="font-extrabold uppercase">Known For:</div>
                  <span>{castDetails.known_for_department || "N/A"}</span>
                </div>
                <div className="flex gap-1 truncate">
                  <div className="font-extrabold uppercase">Birthday:</div>
                  {castDetails.birthday
                    ? dayjs(castDetails.birthday).format("MMM DD,YYYY")
                    : "Unknown"}
                </div>
              </div>
              <div className="w-full flex flex-col gap-2.5 tracking-widest text-xs xs:text-sm lg:text-sm truncate">
                <div className="flex items-center gap-1">
                  <div className="font-extrabold uppercase">Gender:</div>
                  <span>{getGender(castDetails.gender)}</span>
                </div>
                <div className="flex gap-1 truncate">
                  <div className="font-extrabold uppercase">
                    Place of Birth:
                  </div>
                  {castDetails.place_of_birth || "Unknown"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-20 flex flex-col gap-10 lg:gap-20 lg:mt-40">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semibold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            ALSO KNOWN FOR
          </h1>
          <div>
            <Swiper
              modules={[Navigation]}
              slidesPerView={"auto"}
              spaceBetween={10}
              navigation
              className="swiper-carousel"
            >
              {castMovie
                .slice()
                .sort((a, b) => {
                  const yearA =
                    new Date(
                      a.release_date || a.first_air_date
                    ).getFullYear() || 0;
                  const yearB =
                    new Date(
                      b.release_date || b.first_air_date
                    ).getFullYear() || 0;
                  return yearB - yearA;
                })
                .map((movie) => (
                  <SwiperSlide
                    key={`${movie.id}-${movie.credit_id}`}
                    className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
                  >
                    <Link
                      to={
                        movie.media_type === "movie"
                          ? `/movie/${movie.id}`
                          : movie.media_type === "tv"
                          ? `/tv/${movie.id}/season/1`
                          : "#"
                      }
                    >
                      <MovieCard data={movie} />
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
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

export default CastDetails;
