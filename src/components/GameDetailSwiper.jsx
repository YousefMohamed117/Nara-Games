import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css";
import { Link } from "react-router-dom";

const GameDetailSwiper = ({ game, title, path }) => {
  return (
    <div className=" my-12 game-detail-swiper">
      <p
        className="text-3xl mb-5 p-2"
        style={{ textShadow: "0px 0px 6px black" }}
      >
        {title}
      </p>
      <Swiper
        spaceBetween={40}
        mousewheel={true}
        modules={[Mousewheel]}
        slidesPerView={"auto"}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1450: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className={` sm:w-[calc(100vw-139px)] w-[calc(100vw-20px)] ${
          game[path].length < 4 && "center-img"
        } `}
      >
        {path === "artworks"
          ? game[path] &&
            game[path].map((e, i) => (
              <SwiperSlide
                key={i}
                className={`mb-7 !w-[250px] ${
                  game[path].length < 5 && "!mx-auto"
                }`}
              >
                <div className="relative">
                  <img src={e.url} alt="" className="" />
                </div>
              </SwiperSlide>
            ))
          : game[path] &&
            game[path].map((e, i) => (
              <SwiperSlide key={i} className={`mb-7 !w-[250px]`}>
                <Link to={`/game/${e.id}`}>
                  <div className="relative">
                    <img src={e.cover.url} alt="" className="" />
                    {e.name && (
                      <p className="absolute bottom-0 text-lg">{e.name}</p>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default GameDetailSwiper;
