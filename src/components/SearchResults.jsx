import React from "react";
import { Link } from "react-router-dom"; // Make sure you import Link
import { Rating } from "./Rating";
import dayjs from "dayjs";
import { Dot } from "lucide-react";

const SearchResults = ({ results, query, setShowResults }) => {
  if (!query || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full flex flex-col gap-6 bg-[#180102] shadow-lg z-4 p-4 rounded-b-xl">
      {results.slice(0, 5).map((item) => {
        const isTVShow = item.media_type === "tv";
        const linkTo = isTVShow
          ? `/tv/${item.id}/season/1`
          : item.media_type === "movie"
          ? `/movie/${item.id}`
          : "#";

        return (
          <Link to={linkTo} key={item.id} onClick={() => setShowResults(false)}>
            <div className="flex items-center justify-between gap-3 px-2">
              <img
                src={
                  item.englishBackdrop
                    ? `https://image.tmdb.org/t/p/original${item.englishBackdrop}`
                    : "/no-image-landscape.svg"
                }
                alt={item.title || item.name}
                className="w-[6.25rem] h-[3.5rem] md:w-[8.125rem] md:h-[4.5625rem] object-cover rounded border border-[#320204] transition-all"
              />
              <div className="flex flex-col w-full text-white font-poppins gap-1 truncate">
                <div className="text-xs lg:text-sm font-semibold w-full truncate">
                  {item.title || item.name}
                </div>
                <div className="flex items-center text-xs lg:text-sm text-[#ADADAD] uppercase">
                  {dayjs(item.release_date || item.first_air_date).format(
                    "YYYY"
                  )}
                  <Dot />
                  {item.media_type}
                </div>
              </div>
              <div className="w-fit">
                <Rating rating={Number(item.vote_average).toFixed(1)} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
