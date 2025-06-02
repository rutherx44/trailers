import React from "react";
import logo from "../assets/logo.png";

const Card = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2.5  bg-[#4D0407]">
        <img className="cursor-pointer image" src={logo} alt="Trailers Logo" />
        <p className="font-poppins no_image text-center tracking-widest">
          NO IMAGE
          <br />
          FOUND
        </p>
      </div>
    </>
  );
};

export default Card;
