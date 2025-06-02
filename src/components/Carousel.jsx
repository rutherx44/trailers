import React from "react";

const Carousel = () => {
  return (
    <>
      <div className="mt-20 px-4 md:px-8 lg:px-16">
        <div className="h-auto font-poppins flex gap-2">
          <div className="w-1 bg-[#E50914]"></div>
          <h2 className="text-lg lg:text-xl xl:text-2xl">TOP 10 MOVIES</h2>
        </div>
        <div>pagination</div>
      </div>
    </>
  );
};

export default Carousel;
