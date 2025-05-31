import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const Navbar = () => {
  const sideContentRef = useRef();
  const searchRef = useRef();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openMenu = () => {
    sideContentRef.current.style.transform = "translateX(-125rem)";
  };
  const closeMenu = () => {
    sideContentRef.current.style.transform = "translateX(125rem)";
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    searchRef.current.style.transform = "translateY(7.5rem)";
    console.log(setIsSearchOpen);
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
    searchRef.current.style.transform = "translateY(-7.5rem)";
  };

  return (
    <nav id="home">
      <div className="w-full flex sticky top-0 left-0 z-10 items-center justify-between bg-[#180102] h-16 px-4 md:h-20 md:px-8 lg:h-24 lg:px-16">
        <a href="#home">
          <img
            className="cursor-pointer w-[8.125rem] md:w-[10.875rem] lg:w-[11.5rem]"
            src={logo}
            alt="Trailers Logo"
          />
        </a>
        <div className="hidden relative items-center w-[21.875rem] lg:flex xl:w-[31.25rem] 2xl:w-[48rem] text-[#ADADAD] focus-within:text-white transition-all duration-600">
          <Search
            title="Search"
            className="absolute ml-2.5 w-6 h-6 pointer-events-none"
          />
          <input
            type="text"
            name="search"
            placeholder="Search"
            autoComplete="off"
            className="w-full text-white placeholder-[#ADADAD] px-2.5 py-2 rounded-sm bg-[#4D0407] pl-11 border-none focus:outline-2 focus:outline-[#E50914]"
          />
        </div>
        <ul className="hidden font-poppins text-lg items-center gap-3.5 tracking-wider transition-all lg:flex">
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
            />
          </button>
          <button
            title="Chevron Left"
            className="cursor-pointer"
            onClick={openMenu}
          >
            <ChevronLeft className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <ul
        ref={sideContentRef}
        className="lg:hidden font-poppins text-lg flex fixed items-center justify-center flex-col gap-6 tracking-wider z-10 bg-[#180102] shadow-[0_0_1.875rem] shadow-[#490D0A] w-3/4 h-full top-0 bottom-0 -right-500 transition-all duration-600"
      >
        <button
          title="X"
          className="lg:hidden cursor-pointer absolute top-5 left-4 md:top-6 md:left-8"
          onClick={closeMenu}
        >
          <ChevronRight className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8" />
        </button>
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
        className="lg:hidden z-5 w-full relative -top-30 left-0 right-0 flex items-center h-16 px-4 md:px-8 md:h-20 transition-all duration-500 bg-[#180102] opacity-90"
      >
        <div className="w-full flex items-center text-[#ADADAD] focus-within:text-white">
          <Search
            title="Search"
            className="absolute ml-2.5 w-6 h-6 pointer-events-none"
          />
          <input
            type="text"
            name="search"
            placeholder="Search"
            autoComplete="off"
            className="w-full text-white placeholder-[#ADADAD] px-2.5 py-2 rounded-sm bg-[#4D0407] pl-11 border-none focus:outline-2 focus:outline-[#E50914]"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
