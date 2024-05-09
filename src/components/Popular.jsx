import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css";

const Popular = ({ popular, setId }) => {
  return (
    <div className="basis-1/4 pl-[10px]">
      <p className="text-2xl mb-3" style={{ textShadow: "0px 0px 6px black" }}>
        Popular Games
      </p>
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1450: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        mousewheel={true}
        modules={[Mousewheel]}
        className="lg:w-[calc((100vw-100px)/4*3)] sm:w-[calc(100vw-129px)] w-[calc(100vw-20px)] md:max-h-[180px] max-h-full"
      >
        {popular &&
          popular.map((e, i) => (
            <SwiperSlide key={i} className="mb-7 ">
              <div
                key={e.id}
                onClick={() => setId(e.id)}
                className="cursor-pointer flex gap-2 p-4 bg-[rgba(0,0,0,0.2)] rounded-2xl hover:scale-105 duration-300"
              >
                <img
                  src={e.cover.url}
                  alt=""
                  className="rounded-2xl w-[150px] h-[150px] object-cover"
                />
                <div className="">
                  {e.name && e.name.length < 20 && (
                    <p className="text-xl mb-4">{e.name.slice(0, 20)}</p>
                  )}
                  {e.name && e.name.length > 20 && (
                    <p className="text-xl mb-4">
                      {e.name && e.name.length > 20 && e.name.slice(0, 20)}...
                    </p>
                  )}
                  <p>{e.summary && e.summary.slice(0, 100)}...</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Popular;
