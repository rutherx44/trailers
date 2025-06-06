import React from "react";
import no_image_portrait from "../assets/no_image_portrait.svg";
import no_image_landscape from "../assets/no_image_landscape.svg";
import { Rating } from "./Rating";
import { Dot, Info, Play } from "lucide-react";
import Button from "./Button";
import dayjs from "dayjs";

export const HeroCard = (props) => {
  return (
    <>
      <div className="w-full h-full">
        <div className="md:hidden">
          {props.data.poster_path ? (
            <img
              className="cursor-pointer w-full"
              src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
              alt={props.data.id}
            />
          ) : (
            <img
              className="cursor-pointer w-full"
              src={no_image_portrait}
              alt={props.data.id}
            />
          )}
        </div>
        <div className="hidden md:flex">
          {props.data.backdrop_path ? (
            <img
              className="cursor-pointer w-full"
              src={`https://image.tmdb.org/t/p/original${props.data.backdrop_path}`}
              alt={props.data.id}
            />
          ) : (
            <img
              className="cursor-pointer w-full"
              src={no_image_landscape}
              alt={props.data.id}
            />
          )}
        </div>
        <div className="absolute top-0 left-0 w-full h-full shade flex items-center justify-center pb-[3.125rem] md:pb-[1.625rem] lg:pb-[2.5rem] xl:pb-[3.25rem]">
          <div className="items-center justify-center w-full h-auto transition-all px-4 md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
            <div className="hidden md:w-[9.5rem] md:h-[14.25rem] md:flex lg:w-[12.5rem] lg:h-[18.75rem] xl:w-[15rem] xl:h-[22.5rem]">
              <div className="flex flex-col items-center justify-center gap-2.5 rounded-md md:w-[9.5rem] md:h-full lg:w-[12.5rem] lg:h-full xl:w-[15rem] xl:h-full">
                {props.data.poster_path ? (
                  <img
                    className="cursor-pointer w-full h-full rounded-md"
                    src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
                    alt={props.data.id}
                  />
                ) : (
                  <img
                    className="cursor-pointer w-full h-full rounded-md"
                    src={no_image_portrait}
                    alt={props.data.id}
                  />
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-4 md:w-[25.5rem] md:gap-5 lg:gap-6 lg:w-lg xl:w-2xl">
              <h1 className="w-full text-center font-roboto font-black tracking-wider truncate text-[2rem] transition-all md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                {props.data.title || props.data.name}
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-center gap-3 font-poppins transition-all">
                  <Rating rating={Number(props.data.vote_average).toFixed(1)} />
                  <a href="/">
                    <Button icon={<Play />} displayText="WATCH NOW" />
                  </a>
                  <p className="flex items-center font-poppins text-center gap-2 uppercase text-xs tracking-widest transition-all lg:text-sm">
                    <Dot />
                    {props.data.media_type}
                  </p>
                </div>
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

export const MovieCard = (props) => {
  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2">
      <div className="w-[12.4375rem] h-[7.625rem] md:w-[14.25rem] md:h-[8rem] lg:w-[15.875rem] lg:h-[9rem] rounded-md transition-all">
        {(
          <img
            title={props.data.title || props.data.name}
            className="cursor-pointer w-full h-full rounded-md"
            src={`https://image.tmdb.org/t/p/w500${props.data.backdrop_path}`}
            alt={props.data.id}
          />
        ) || (
          <img
            className="cursor-pointer w-full h-full rounded-md"
            src={no_image_landscape}
            alt={props.data.id}
          />
        )}
      </div>
      <div className="w-[12.4375rem] md:w-[14.25rem] lg:w-[15.875rem] transition-all">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <div className="text-[#E50914] font-roboto font-black text-[2.5rem] md:text-[2.75rem] lg:text-5xl">
              {props.num + 1}
            </div>
            <div className="flex flex-col truncate">
              <p
                title={props.data.title || props.data.name}
                className="font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
              >
                {props.data.title || props.data.name}
              </p>
              <p className="font-normal tracking-widest transition-all text-[0.625rem] lg:text-sm">
                {dayjs(props.data.release_date).format("YYYY")}
              </p>
            </div>
          </div>
          <div className="">
            <Rating rating={Number(props.data.vote_average).toFixed(1)} />
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
            className="w-full h-[25vh] 2xs:h-[30vh] xs:h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[70vh] xl:h-[41.625rem] rounded-md"
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}
      </div>

      <div className="w-full transition-all mt-2.5">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <div className="flex flex-col truncate">
              <p
                title={data.title || data.name}
                className="font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
              >
                {data.title || data.name}
              </p>
              <p className="font-normal tracking-widest transition-all text-[0.625rem] lg:text-sm">
                {dayjs(data.release_date).format("YYYY")}
              </p>
            </div>
          </div>
          <div>
            <a href="/">
              <Button icon={<Info />} displayText="VIEW DETAILS" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LatestCard = (props) => {
  return (
    <div className="w-fit flex flex-col gap-1 lg:gap-2">
      <div className="w-[12.4375rem] h-[7.625rem] md:w-[14.25rem] md:h-[8rem] lg:w-[15.875rem] lg:h-[9rem] rounded-md transition-all">
        {(
          <img
            title={props.data.title || props.data.name}
            className="cursor-pointer w-full h-full rounded-md"
            src={`https://image.tmdb.org/t/p/w500${props.data.backdrop_path}`}
            alt={props.data.id}
          />
        ) || (
          <img
            className="cursor-pointer w-full h-full rounded-md"
            src={no_image_landscape}
            alt={props.data.id}
          />
        )}
      </div>
      <div className="w-[12.4375rem] md:w-[14.25rem] lg:w-[15.875rem] transition-all">
        <div className="flex gap-1.5 justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <div className="flex flex-col truncate">
              <p
                title={props.data.title || props.data.name}
                className="font-bold tracking-widest transition-all text-xs lg:text-sm truncate"
              >
                {props.data.title || props.data.name}
              </p>
              <p className="font-normal tracking-widest transition-all text-[0.625rem] lg:text-sm">
                {dayjs(props.data.release_date).format("YYYY")}
              </p>
            </div>
          </div>
          <div className="">
            <Rating rating={Number(props.data.vote_average).toFixed(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};
