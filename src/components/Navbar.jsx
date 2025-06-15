import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { useDebouncedValue } from "@mantine/hooks";

const Navbar = () => {
  const sideContentRef = useRef();
  const searchRef = useRef();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 500);
  const [showResults, setShowResults] = useState(true);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const searchMovies = useRef();

  /* Side menu function */
  const openMenu = () => {
    sideContentRef.current.style.transform = "translateX(-125rem)";
  };
  const closeMenu = () => {
    sideContentRef.current.style.transform = "translateX(125rem)";
  };

  /* Search bar in mobile function */
  const openSearch = () => {
    setIsSearchOpen(true);
    searchRef.current.style.transform = "translateX(125rem)";
    setColor("#E50914");
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
    searchRef.current.style.transform = "translateX(-125rem)";
    setColor("#ffffff");
  };

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;

  const options = {
    params: {
      language: "en-US",
      include_image_language: "en",
      query: debounced,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  searchMovies.current = async () => {
    try {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/search/multi`, options);

      const filteredResults = results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      const searchDetailsPromises = filteredResults.map(async (item) => {
        try {
          const imagesResponse = await axios.get(
            `${BASE_URL}/movie/${item.id}/images?`,
            options
          );

          const englishBackdrops = imagesResponse.data.backdrops || [];
          const firstBackdrop =
            englishBackdrops.length > 0 ? englishBackdrops[0].file_path : null;

          return {
            ...item,
            englishBackdrop: firstBackdrop
              ? `https://image.tmdb.org/t/p/original${firstBackdrop}`
              : item.backdrop_path,
          };
        } catch (error) {
          console.error("Error fetching movie images:", error);
          return { ...item, genres: [], englishBackdrop: item.backdrop_path };
        }
      });

      const searchWithDetails = await Promise.all(searchDetailsPromises);
      setResults(searchWithDetails);
    } catch (error) {
      console.error("Error fetching search", error);
    }
  };

  useEffect(() => {
    if (debounced.trim() !== "") {
      searchMovies.current(debounced);
    } else {
      setResults([]);
    }
  }, [debounced]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="relative">
      <div
        ref={desktopSearchRef}
        className="w-full flex fixed top-0 left-0 z-10 items-center justify-between bg-[#180102] h-16 px-4 md:h-20 md:px-8 lg:h-24 lg:px-16"
      >
        <a href="/">
          <img
            className="cursor-pointer w-[8.125rem] md:w-[10.875rem] lg:w-[11.5rem]"
            src={logo}
            alt="Trailers Logo"
          />
        </a>
        <div className="hidden relative items-center pb-0.5 w-[21.875rem] lg:flex xl:w-[31.25rem] 2xl:w-[48rem] text-[#ADADAD] focus-within:text-white transition-all opacity-95">
          <div className="relative flex items-center w-full">
            <Search
              title="Search"
              color="#ffffff"
              className="absolute ml-2.5 w-6 h-6 pointer-events-none"
            />
            <input
              type="text"
              name="search"
              placeholder="Search"
              autoComplete="off"
              value={query}
              className="w-full text-white placeholder-[#ADADAD] px-2.5 py-2 rounded-sm bg-[#4D0407] pl-11 border-none focus:outline-1 focus:outline-[#E50914]"
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);

                if (val.trim() !== "") {
                  setShowResults(true);
                } else {
                  setShowResults(false);
                }
              }}
              onFocus={() => {
                if (query.trim() !== "") {
                  setShowResults(true);
                }
              }}
            />
            {query && (
              <X
                title="Clear"
                color="#adadad"
                className="absolute right-0 mr-2.5 w-6 h-6 cursor-pointer hover:stroke-[#E50914]"
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                }}
              />
            )}
          </div>
          {showResults && (
            <SearchResults
              results={results}
              query={query}
              setShowResults={setShowResults}
            />
          )}
        </div>
        <ul className="hidden font-poppins text-lg items-center gap-3.5 tracking-wider transition-all lg:flex">
          <li className="hover:text-[#E50914] transition-all cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-[#E50914] transition-all cursor-pointer">
            <a href="#browse">Browse</a>
          </li>
          <li className="hover:text-[#E50914] transition-all cursor-pointer">
            <a href="#movies">Movies</a>
          </li>
          <li className="hover:text-[#E50914] transition-all cursor-pointer">
            <a href="#tvshows">TV Shows</a>
          </li>
        </ul>
        <div className="lg:hidden flex gap-2">
          <button title="Search" className="cursor-pointer">
            <Search
              className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8"
              onClick={() => (isSearchOpen ? closeSearch() : openSearch())}
              color={color}
            />
          </button>
          <button
            title="Open Menu"
            className="cursor-pointer"
            onClick={openMenu}
          >
            <ChevronLeft
              color="#ffffff"
              className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8"
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <ul
        ref={sideContentRef}
        className="lg:hidden font-poppins text-lg flex fixed items-center justify-center flex-col gap-6 tracking-wider z-10 bg-[#180102] shadow-[0_0_1.875rem] shadow-[#490D0A] w-3/4 h-full top-0 bottom-0 -right-500 transition-all duration-600"
      >
        <button
          title="Close Menu"
          className="lg:hidden cursor-pointer absolute top-5 left-4 md:top-6 md:left-8"
          onClick={closeMenu}
        >
          <ChevronRight
            color="#ffffff"
            className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8"
          />
        </button>
        <li className="hover:text-[#E50914] transition-all cursor-pointer">
          <a href="/" onClick={closeMenu}>
            Home
          </a>
        </li>
        <li className="hover:text-[#E50914] transition-all cursor-pointer">
          <a href="#browse" onClick={closeMenu}>
            Browse
          </a>
        </li>
        <li className="hover:text-[#E50914] transition-all cursor-pointer">
          <a href="#movies" onClick={closeMenu}>
            Movies
          </a>
        </li>
        <li className="hover:text-[#E50914] transition-all cursor-pointer">
          <a href="#tvshows" onClick={closeMenu}>
            TV Shows
          </a>
        </li>
      </ul>

      {/* Mobile Search */}
      <div
        ref={searchRef}
        className="lg:hidden z-5 w-full fixed top-16 right-500 flex items-center h-16 px-4 md:top-20 md:px-8 md:h-20 transition-all duration-500 bg-[#180102] opacity-95"
      >
        <div
          ref={mobileSearchRef}
          className="w-full flex items-center pb-0.5 justify-between text-[#ADADAD] focus-within:text-white"
        >
          <div className="relative flex items-center w-full">
            <Search
              title="Search"
              color="#ffffff"
              className="absolute ml-2.5 w-6 h-6 pointer-events-none"
            />
            <input
              type="text"
              name="search"
              placeholder="Search"
              autoComplete="off"
              value={query}
              className="w-full text-white placeholder-[#ADADAD] px-2.5 py-2 rounded-sm bg-[#4D0407] pl-11 border-none focus:outline-1 focus:outline-[#E50914]"
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);

                if (val.trim() !== "") {
                  setShowResults(true);
                } else {
                  setShowResults(false);
                }
              }}
              onFocus={() => {
                if (query.trim() !== "") {
                  setShowResults(true);
                }
              }}
            />
            {query && (
              <X
                title="Clear"
                color="#adadad"
                className="absolute right-0 mr-2.5 w-6 h-6 cursor-pointer hover:stroke-[#E50914]"
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                }}
              />
            )}
          </div>
          {showResults && (
            <SearchResults
              results={results}
              query={query}
              setShowResults={setShowResults}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
