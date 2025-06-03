import React from "react";
import no_image_portrait from "../assets/no_image_portrait.svg";
import { Rating } from "./Rating";
import { Dot } from "lucide-react";

const Card = (props) => {
  console.log(props);
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
          {props.data.poster_path ? (
            <img
              className="cursor-pointer w-full"
              src={`https://image.tmdb.org/t/p/original${props.data.backdrop_path}`}
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
        <div className="absolute top-0 left-0 w-full h-full shade flex items-end justify-center pb-[3.125rem] md:pb-[1.625rem] lg:pb-[2.5rem] xl:pb-[3.25rem]">
          <div className="items-center justify-center w-full h-auto transition-all px-4 md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
            <div className="hidden md:w-[9.5rem] md:h-[14.25rem] md:flex lg:w-[12.5rem] lg:h-[18.75rem] xl:w-[15rem] xl:h-[22.5rem]">
              <div className="flex flex-col items-center justify-center gap-2.5 bg-[#4D0407] md:w-[9.5rem] md:h-full lg:w-[12.5rem] lg:h-full xl:w-[15rem] xl:h-full">
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
            </div>
            <div className="w-full h-[11.1875rem] flex flex-col items-center font-poppins gap-4 md:w-[25.5rem] md:h-[13.125rem] md:gap-5 lg:gap-6 lg:w-auto xl:h-[15.625rem]">
              <h1 className="w-full h-full text-center tracking-wider truncate text-[2rem] transition-all md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                {props.data.title || props.data.name}
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-center gap-3 transition-all">
                  <Rating rating={Number(props.data.vote_average).toFixed(1)} />
                  <button>Watch Now</button>
                  <p className="flex items-center font-poppins text-center gap-2 tracking-widest uppercase text-[10px]">
                    <Dot />
                    {props.data.media_type}
                  </p>
                </div>
              </div>
              <p className="w-full h-full text-center text-wrap truncate overflow-scroll text-[0.625rem] tracking-widest transition-all md:text-xs lg:text-sm xl:text-base">
                {props.data.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
