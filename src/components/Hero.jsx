import React from "react";
import Card from "./Card";

const Hero = () => {
  return (
    <>
      <div className="w-full h-svh relative">
        <Card />
        <div className="absolute top-0 left-0 w-full h-svh shade flex items-end justify-center pb-[3.125rem] md:pb-[1.625rem] lg:pb-[2.5rem] xl:pb-[3.25rem]">
          <div className="items-center justify-center w-60 h-auto transition-all md:flex md:w-[40rem] md:h-[16.75rem] md:px-5 md:py-5 md:gap-10 lg:w-[48rem] lg:h-80 xl:w-5xl xl:h-[25rem]">
            <div className="blue">
              <img
                src=""
                alt="No Image Found"
                className="hidden w-[9.5rem] h-[14.25rem] md:flex"
              />
            </div>
            <div className="w-full h-[11.1875rem] flex flex-col items-center font-poppins gap-4 md:w-[25.5rem] md:h-[13.125rem] md:gap-5 lg:gap-6 lg:w-auto xl:h-[15.625rem]">
              <h1 className="w-full text-center tracking-wider text-[2rem] transition-all md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                Title
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-center gap-3 transition-all">
                  <div>Rating</div>
                  <button>Watch Now</button>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <div>Badge</div>
                </div>
              </div>
              <p className="h-full text-center text-wrap truncate w-60 text-[0.625rem] tracking-widest transition-all md:w-full md:text-xs lg:text-sm xl:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                mollitia nobis, quisquam repellendus id quaerat quos assumenda
                ullam eaque voluptate quibusdam veniam iure vero nihil eos totam
                sit, repudiandae omnis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
