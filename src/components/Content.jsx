import React from "react";
import logo from "../assets/logo.png";
import tmdb_mobile from "../assets/tmdb_mobile.png";
import tmdb_tablet from "../assets/tmdb_tablet.png";
import tmdb_desktop from "../assets/tmdb_desktop.png";

import {
  LaptopMinimal,
  Monitor,
  Smartphone,
  Tablet,
  TvMinimal,
} from "lucide-react";

const Content = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center justify-center gap-5">
          <div>
            <img
              className="cursor-pointer w-[8.125rem] md:w-[10.875rem] lg:w-[11.5rem]"
              src={logo}
              alt="Trailers Logo"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="w-[15rem] text-center font-roboto font-black tracking-wider text-[2rem] transition-all md:w-full md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
              Watch on every device.
            </h1>
            <p className="w-[15rem] text-center font-poppins tracking-widest text-[0.625rem] md:w-[40rem] md:text-xs lg:w-[53.75rem] lg:text-base">
              Seamless streaming on any device—whether it’s your phone, tablet,
              laptop, desktop or smart TV. Watch wherever you are, whenever you
              want, with uninterrupted access across all platforms.
            </p>
          </div>
        </div>
        <div className="w-[15rem] flex flex-wrap items-center justify-center gap-x-10 gap-y-10 md:w-full">
          <div className="w-[5.625rem] h-auto flex flex-col items-center font-poppins text-[#adadad] gap-2.5">
            <div className="flex items-center justify-center">
              <Smartphone className="w-[2.125rem] h-[2.125rem] md:w-[2.625rem] md:h-[2.625rem] lg:w-[3.125rem] lg:h-[3.125rem]" />
            </div>
            <p className="text-sm md:text-base lg:text-lg">Phone</p>
          </div>
          <div className="w-[5.625rem] h-auto flex flex-col items-center font-poppins text-[#adadad] gap-2.5">
            <div className="flex items-center justify-center">
              <Tablet className="w-[2.125rem] h-[2.125rem] md:w-[2.625rem] md:h-[2.625rem] lg:w-[3.125rem] lg:h-[3.125rem]" />
            </div>
            <p className="text-sm md:text-base lg:text-lg">Tablet</p>
          </div>
          <div className="w-[5.625rem] h-auto flex flex-col items-center font-poppins text-[#adadad] gap-2.5">
            <div className="flex items-center justify-center">
              <LaptopMinimal className="w-[2.125rem] h-[2.125rem] md:w-[2.625rem] md:h-[2.625rem] lg:w-[3.125rem] lg:h-[3.125rem]" />
            </div>
            <p className="text-sm md:text-base lg:text-lg">Laptop</p>
          </div>
          <div className="w-[5.625rem] h-auto flex flex-col items-center font-poppins text-[#adadad] gap-2.5">
            <div className="flex items-center justify-center">
              <Monitor className="w-[2.125rem] h-[2.125rem] md:w-[2.625rem] md:h-[2.625rem] lg:w-[3.125rem] lg:h-[3.125rem]" />
            </div>
            <p className="text-sm md:text-base lg:text-lg">Desktop</p>
          </div>
          <div className="w-[5.625rem] h-auto flex flex-col items-center font-poppins text-[#adadad] gap-2.5">
            <div className="flex items-center justify-center">
              <TvMinimal className="w-[2.125rem] h-[2.125rem] md:w-[2.625rem] md:h-[2.625rem] lg:w-[3.125rem] lg:h-[3.125rem]" />
            </div>
            <p className="text-sm md:text-base lg:text-lg">Smart TV</p>
          </div>
        </div>
      </div>
      <div className="mt-20 lg:mt-40 flex flex-col items-center justify-center gap-5">
        <div>
          <img
            className="cursor-pointer w-[6.25rem] md:hidden"
            src={tmdb_mobile}
            alt="The Movie DB Logo"
          />
          <img
            className="cursor-pointer w-[9.375rem] hidden md:flex lg:hidden"
            src={tmdb_tablet}
            alt="The Movie DB Logo"
          />
          <img
            className="cursor-pointer w-[29rem] hidden lg:flex"
            src={tmdb_desktop}
            alt="The Movie DB Logo"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 w-[15rem] text-center font-poppins tracking-widest text-[0.625rem] md:w-[40rem] md:text-xs lg:w-[53.75rem] lg:text-base">
          <h1>
            "This website uses the TMDB API but is not endorsed or certified by
            TMDB."
          </h1>
          <p className="text-[#adadad]">
            DISCLAIMER
            <br /> "This website does not store any files on its server. All
            contents are provided by non-affiliated third parties."
          </p>
        </div>
      </div>
    </>
  );
};

export default Content;
