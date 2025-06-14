import React from "react";

const SearchResults = ({ results, query }) => {
  if (!query || results.length === 0) return null;

  return (
    <div className="absolute top-full mt-2 left-0 w-full bg-[#180102] rounded-lg shadow-lg z-50 p-4 space-y-4">
      {results.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-3 bg-[#2A0C0D] rounded-md"
        >
          <img
            src={
              item.englishBackdrop
                ? item.englishBackdrop
                : "https://via.placeholder.com/150x80?text=No+Image"
            }
            alt={item.title || item.name}
            className="w-28 h-16 object-cover rounded"
          />
          <div className="flex flex-col text-white">
            <h2 className="text-md font-semibold">{item.title || item.name}</h2>
            <p className="text-sm text-[#ADADAD]">
              {(item.release_date || item.first_air_date || "N/A").slice(0, 4)}{" "}
              •{" "}
              {item.media_type?.charAt(0).toUpperCase() +
                item.media_type?.slice(1) || "Movie"}
            </p>
          </div>
          {item.vote_average && (
            <div className="ml-auto">
              <div className="w-8 h-8 bg-black border-2 border-green-600 text-green-400 text-sm font-bold flex items-center justify-center rounded-full">
                {item.vote_average.toFixed(1)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
