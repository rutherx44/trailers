import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Rating = ({ rating }) => {
  return (
    <div className="bg-[#141414] rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        minValue={0}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          textSize: "35px",
          textColor: "#ffffff",
        })}
      />
    </div>
  );
};
