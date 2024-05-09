import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css";
import ReactPlayer from "react-player/youtube";

// Only loads the YouTube player
const Videos = ({ game }) => {
  return (
    <div className=" my-16">
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
        className={`sm:w-[calc(100vw-139px)] w-[calc(100vw-20px)] ${
          game.videos.length < 3 && "center-img"
        } `}
      >
        {game &&
          game.videos.map((e, i) => (
            <SwiperSlide key={i} className="mb-7 ">
              <div
                key={e.id}
                className="cursor-pointer flex gap-2 p-4 bg-[rgba(0,0,0,0.2)] rounded-2xl"
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${e.video_id}`}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Videos;
