import React from "react";
import { Rating } from "./Rating";
import { Dot, Info, Play } from "lucide-react";
import Button from "./Button";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const HeroCard = (props) => {
  const isMovie = props.data.media_type === "movie";
  const isTVShow = props.data.media_type === "tv";

  return (
    <>
      <div className="w-full h-full">
        <div className="md:hidden">
          <img
            title={props.data.title || props.data.name}
            className="cursor-pointer w-full h-full"
            src={
              props.data.poster_path
                ? `https://image.tmdb.org/t/p/w500${props.data.poster_path}`
                : "/no-image-portrait.svg"
            }
            alt={props.data.id}
          />
        </div>
        <div className="hidden md:flex">
          <img
            title={props.data.title || props.data.name}
            className="cursor-pointer w-full h-full"
            src={
              props.data.backdrop_path
                ? `https://image.tmdb.org/t/p/original${props.data.backdrop_path}`
                : "/no-image-landscape.svg"
            }
            alt={props.data.id}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full shade flex items-center justify-center pb-[3.125rem] md:pb-[1.625rem] lg:pb-[2.5rem] xl:pb-[3.25rem]">
          <div className="items-center justify-center w-full h-auto transition-all px-4 md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
            <div className="hidden md:w-[9.5rem] md:h-[14.25rem] md:flex lg:w-[12.5rem] lg:h-[18.75rem] xl:w-[15rem] xl:h-[22.5rem]">
              <div className="flex flex-col items-center justify-center gap-2.5 rounded-md md:w-[9.5rem] md:h-full lg:w-[12.5rem] lg:h-full xl:w-[15rem] xl:h-full">
                <img
                  title={props.data.title || props.data.name}
                  className="cursor-pointer w-full h-full rounded-md"
                  src={
                    props.data.poster_path
                      ? `https://image.tmdb.org/t/p/w500${props.data.poster_path}`
                      : "/no-image-portrait.svg"
                  }
                  alt={props.data.id}
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-4 md:w-[25.5rem] md:gap-5 lg:gap-6 lg:w-lg xl:w-2xl">
              <h1 className="w-full text-center font-roboto font-black tracking-wider truncate text-[2rem] transition-all md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                {props.data.title || props.data.name}
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-center gap-3 font-poppins transition-all">
                  <Rating rating={Number(props.data.vote_average).toFixed(1)} />
                  <Link
                    to={
                      isMovie
                        ? `/movie/${props.data.id}`
                        : isTVShow
                        ? `/tv/${props.data.id}/season/1`
                        : "#"
                    }
                  >
                    <Button icon={<Play />} displayText="WATCH NOW" />
                  </Link>
                </div>
              </div>
              <div>
                <p className="font-poppins flex items-center uppercase">
                  <span className="py-1 px-2.5 cursor-pointer border border-[#E50914] bg-[#490D0A] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
                    {props.data.media_type}
                  </span>
                  <Dot />
                  <span className="py-1 px-2.5 cursor-pointer border border-[#E50914] bg-[#490D0A] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
                    {dayjs(props.data.release_date).format("YYYY")}
                  </span>
                  <Dot />
                  {props.data.genres.slice(0, 1).map((genre, idx, arr) => (
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
              <p className="w-full text-center text-wrap truncate font-poppins line-clamp-3 text-xs tracking-widest transition-all md:line-clamp-4 lg:text-sm xl:line-clamp-6">
                {props.data.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TopMovieCard = (props) => {
  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2">
      <div className="w-[12.4375rem] h-[7.625rem] md:w-[14.25rem] md:h-[8rem] lg:w-[15.875rem] lg:h-[9rem] rounded-md transition-all border border-[#320204]">
        <img
          title={props.data.title || props.data.name}
          className="cursor-pointer w-full h-full rounded-md"
          src={
            props.data.englishBackdrop
              ? `https://image.tmdb.org/t/p/original${props.data.englishBackdrop}`
              : "/no-image-landscape.svg"
          }
          alt={props.data.id}
        />
      </div>
      <div className="w-[12.4375rem] md:w-[14.25rem] lg:w-[15.875rem] transition-all">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="font-poppins flex items-center gap-2 truncate">
            <div className="text-[#E50914] font-roboto font-black text-[2.5rem] md:text-[2.75rem] lg:text-5xl">
              {props.num + 1}
            </div>
            <div className="flex flex-col text-[#adadad] truncate">
              <div
                title={props.data.title || props.data.name}
                className="font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
              >
                {props.data.title || props.data.name}
              </div>
              <div className="flex w-full items-center font-poppins font-normal tracking-widest truncate transition-all text-xs lg:text-sm">
                {dayjs(props.data.release_date).format("YYYY")}
                {props.data.genres?.slice(0, 1).map((genre, idx, arr) => (
                  <span key={idx} className="flex items-center truncate">
                    {idx < arr.length - 0 && (
                      <span className="text-white">
                        <Dot />
                      </span>
                    )}
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Rating rating={Number(props.data.vote_average).toFixed(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MovieCard = (props) => {
  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2">
      <div className="w-[12.4375rem] h-[7.625rem] md:w-[14.25rem] md:h-[8rem] lg:w-[15.875rem] lg:h-[9rem] rounded-md transition-all border border-[#320204]">
        <img
          title={props.data.title || props.data.name}
          className="cursor-pointer w-full h-full rounded-md"
          src={
            props.data.englishBackdrop
              ? `https://image.tmdb.org/t/p/original${props.data.englishBackdrop}`
              : "/no-image-landscape.svg"
          }
          alt={props.data.id}
        />
      </div>
      <div className="w-[12.4375rem] md:w-[14.25rem] lg:w-[15.875rem] transition-all">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <div className="flex flex-col text-[#adadad] truncate">
              {props.data.media_type && (
                <div
                  className={`absolute top-2 right-2 font-extrabold text-[0.5rem] lg:text-[0.625rem] px-2 py-1 rounded-full shadow-md uppercase tracking-widest ${
                    props.data.media_type === "movie"
                      ? "bg-blue-500 border-3 border-blue-300 text-blue-950"
                      : "bg-green-500 border-3 border-green-300 text-green-950"
                  }`}
                >
                  {props.data.media_type === "movie" ? "Movie" : "TV Show"}
                </div>
              )}
              <p
                title={props.data.title || props.data.name}
                className="font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
              >
                {props.data.title || props.data.name}
              </p>
              <p className="flex items-center font-poppins font-normal tracking-widest transition-all text-xs lg:text-sm">
                {dayjs(props.data.release_date).format("YYYY")}
                <Dot />
                {props.data.genres?.slice(0, 1).map((genre, idx) => (
                  <span key={idx} className="flex items-center">
                    {genre.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div>
            <Rating rating={Number(props.data.vote_average).toFixed(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CastCard = (props) => {
  const { character, roles } = props.data;
  const characterName =
    roles && roles.length > 0 ? roles[0].character : character;

  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2">
      <div className="h-[12.4375rem] w-[8.3125rem] md:h-[14.25rem] md:w-[9.5rem] lg:h-[15.875rem] lg:w-[10.5625rem] rounded-md transition-all border border-[#320204]">
        <img
          title={props.data.original_name || props.data.name}
          className="cursor-pointer w-fit h-full rounded-md"
          src={
            props.data.profile_path
              ? `https://image.tmdb.org/t/p/original${props.data.profile_path}`
              : "/no-image-portrait.svg"
          }
          alt={props.data.id}
        />
      </div>
      <div className="w-[8.3125rem] md:w-[9.5rem] lg:w-[10.5625rem] transition-all">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <div className="flex flex-col text-[#adadad] truncate">
              <p
                title={props.data.original_name || props.data.name}
                className="font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
              >
                {props.data.original_name || props.data.name}
              </p>
              <p className="flex items-center font-poppins font-normal tracking-widest transition-all text-xs lg:text-sm">
                {characterName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrailerCard = ({ data, videos }) => {
  const videoKey = videos.length > 0 ? videos[0].key : null;
  return (
    <div className="w-full h-full flex flex-col md:w-[44rem] lg:w-[62rem] xl:w-[74rem] transition-all">
      <div className="w-full h-full transition-all">
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            title={videos.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[25vh] 2xs:h-[30vh] xs:h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[70vh] xl:h-[41.625rem] rounded-md border border-[#320204]"
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}
      </div>

      <div className="w-full transition-all mt-2.5">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <div className="flex flex-col text-[#adadad] truncate">
              <p
                title={data.title || data.name}
                className="font-poppins font-bold tracking-widest transition-all text-sm md:text-base lg:text-lg truncate"
              >
                {data.title || data.name}
              </p>
              <p className="font-poppins font-normal tracking-widest transition-all text-sm md:text-base lg:text-lg">
                {dayjs(data.release_date).format("YYYY")}
              </p>
            </div>
          </div>
          <div>
            <Link
              to={`/movie/${data.id}`} // Dynamically generate the URL
            >
              <Button icon={<Info />} displayText="MORE INFO" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GenreCard = ({ data, gradientClass }) => {
  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2">
      <div
        className={`flex items-end px-4 pb-4 rounded-md w-[12.4375rem] h-[7.625rem] md:w-[14.25rem] md:h-[8rem] lg:w-[15.875rem] lg:h-[9rem] ${gradientClass}`}
      >
        <p
          title={data.name}
          className="w-full font-bold tracking-widest transition-all text-xs md:text-base lg:text-lg truncate"
        >
          {data.name}
        </p>
      </div>
    </div>
  );
};

export const EpisodeCard = ({ episode, seasonName, isPlaying }) => {
  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2 cursor-pointer">
      <div className="w-[12.4375rem] h-[7.625rem] md:w-[14.25rem] md:h-[8rem] lg:w-[15.875rem] lg:h-[9rem] rounded-md transition-all border border-[#320204]">
        <img
          title={episode.name}
          className="w-full h-full rounded-md object-cover"
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/original${episode.still_path}`
              : "/no-image-landscape.svg"
          }
          alt={episode.name}
        />
        {isPlaying && (
          <span className="absolute top-2 right-2 bg-pink-500 border-3 border-pink-300 text-white font-bold text-[0.5rem] lg:text-[0.625rem] px-2 py-1 rounded-full shadow-md uppercase tracking-widest">
            NOW PLAYING
          </span>
        )}
      </div>
      <div className="w-[12.4375rem] md:w-[14.25rem] lg:w-[15.875rem] transition-all">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex flex-col text-[#adadad] truncate">
            <p
              title={episode.name}
              className="flex items-center font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
            >
              {seasonName} <Dot /> Episode {episode.episode_number}
            </p>
            <p className="font-poppins font-normal tracking-widest transition-all text-xs lg:text-sm">
              <span>{episode.name}</span>
            </p>
          </div>
          <div>
            <Rating rating={Number(episode.vote_average).toFixed(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};
