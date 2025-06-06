import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { LatestMovie, Movie } from "../components/Movie";
import { LatestTv, Tv } from "../components/Tv";
import Trailer from "../components/Trailer";

const Lading = () => {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="mt-20 flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semiboldbold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            TOP 10 MOVIES
          </h1>
          <Movie />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semiboldbold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            TOP 10 TV SHOWS
          </h1>
          <Tv />
        </div>
      </section>
      <section className="mt-20 lg:mt-40">
        <Trailer />
      </section>
      <section className="mt-20 flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semiboldbold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            TOP 10 MOVIES
          </h1>
          <LatestMovie />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="font-poppins font-semiboldbold tracking-wider text-lg border-l-4 border-[#E50914] pl-2 mx-4 md:mx-8 md:text-xl lg:mx-16 lg:text-2xl">
            TOP 10 TV SHOWS
          </h1>
          <LatestTv />
        </div>
      </section>
    </>
  );
};

export default Lading;
