import React from "react";

const Button = ({ buttonClick, icon = "", displayText = "WATCH NOW" }) => {
  return (
    <button
      className="flex items-center justify-center border font-poppins border-white rounded-sm gap-1 px-3 py-1.5 md:gap-1.5 md:px-3.5 md:py-2 lg:gap-2 lg:px-4 cursor-pointer hover:text-white hover:bg-[#7E050B] active:text-white/50 active:border-white/50 active:bg-transparent transition-all"
      onClick={buttonClick}
    >
      <div className="flex items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4 lg:w-[1.125rem] lg:h-[1.125rem]">
        {icon}
      </div>
      <p className="text-[0.625rem] tracking-widest transition-all md:text-xs lg:text-sm xl:text-base">
        {displayText}
      </p>
    </button>
  );
};

export default Button;
