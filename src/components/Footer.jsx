import React from "react";
import footer_logo from "../assets/footer_logo.svg";

const Footer = () => {
  return (
    <>
      <div className="mb-4 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col text-center font-poppins gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-5 md:items-start">
            <p className="w-fit py-1 px-2.5 cursor-pointer border border-[#E50914] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
              NAVIGATION
            </p>
            <div className="flex flex-col gap-2.5 text-base md:text-lg md:items-start lg:text-xl xl:text-2xl">
              <a href="/">Browse</a>
              <a href="/">Movies</a>
              <a href="/">TV Shows</a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="w-fit py-1 px-2.5 cursor-pointer border border-[#E50914] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
              SOCIAL
            </p>
            <div className="flex flex-col gap-2.5 text-base md:text-lg lg:text-xl xl:text-2xl">
              <a href="/">Instagram</a>
              <a href="/">Dribble</a>
              <a href="/">Github</a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 md:items-end">
            <p className="w-fit py-1 px-2.5 cursor-pointer border border-[#E50914] rounded-full text-white tracking-widest text-[0.5rem] md:text-[0.625rem] lg:text-xs">
              CONTACT
            </p>
            <div className="flex flex-col gap-2.5 text-base md:text-lg md:items-end lg:text-xl xl:text-2xl">
              <p className="text-xs md:text-sm md:text-end md:w-[10.375rem] lg:text-base lg:w-[13.875rem]">
                For questions or feedback,
                <br /> feel free to contact me.
              </p>
              <a href="/">Gmail</a>
              <a href="/">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3.5">
          <p className="font-poppins text-center text-[#adadad] text-xs md:text-sm lg:text-base">
            Copyright © 2025. Designed and Developed by Ruther Dio.
          </p>
          <div className="shade">
            <img
              className="cursor-pointer w-full"
              src={footer_logo}
              alt="Trailers Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
