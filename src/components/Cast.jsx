import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CastCard } from "./Card";

const Cast = ({ type }) => {
  const [casts, setCasts] = useState([]);
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const BASE_URL = "https://api.themoviedb.org/3";
  const VITE_AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
  const fetchCasts = useRef();

  const options = {
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_AUTH_KEY}`,
    },
  };

  fetchCasts.current = async () => {
    try {
      showLoading();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(async () => {
        let response;
        if (type === "movie") {
          response = await axios.get(
            `${BASE_URL}/movie/${id}/credits`,
            options
          );
        } else if (type === "tv") {
          response = await axios.get(
            `${BASE_URL}/tv/${id}/aggregate_credits`,
            options
          );
        }
        setCasts(response.data.cast || []);
        hideLoading();
      }, 1000);
    } catch (error) {
      console.error("Error fetching casts:", error);
      hideLoading();
    }
  };

  useEffect(() => {
    fetchCasts.current();
  }, [id, type]);

  return (
    <>
      <div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={10}
          loop={true}
          navigation
          className="swiper-carousel"
        >
          {casts.map((cast, idx) => (
            <SwiperSlide
              key={idx}
              className="w-fit! pl-2.5 md:pl-3 lg:pl-3.5 xl:pl-4 cursor-pointer"
            >
              <Link to={`/person/${cast.id}`}>
                <CastCard data={cast} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Cast;
