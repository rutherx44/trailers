import React, { useRef } from "react";
import logo from "../assets/logo.png";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const Navbar = () => {
  const sideMenuRef = useRef();
  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-125rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(125rem)";
  };

  return (
    <nav
      id="home"
      className="w-full flex fixed z-10 items-center justify-between bg-[#180102] h-16 px-4 md:h-20 md:px-8"
    >
      <a href="#home">
        <img
          className="cursor-pointer w-[8.125rem] md:w-[10.875rem] lg:w-[11.5rem]"
          src={logo}
          alt="Trailers Logo"
        />
      </a>
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
          <Search className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          title="Chevron Left"
          className="cursor-pointer"
          onClick={openMenu}
        >
          <ChevronLeft className="hover:text-[#E50914] transition-all w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <ul
        ref={sideMenuRef}
        className="lg:hidden font-poppins text-lg flex fixed items-center justify-center flex-col gap-6 tracking-wider z-10 bg-[#180102] shadow-[0_0_1.875rem] shadow-[#490D0A] w-3/4 h-full top-0 bottom-0 -right-500 transition-all duration-500"
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
    </nav>
  );
};

export default Navbar;
