import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css";

const Similar = ({ similar_games, setId,direction }) => {
  return (
    <div className="basis-1/4 lg:block hidden">
      <p className="text-2xl mb-3" style={{ textShadow: "0px 0px 6px black" }}>Similar Games</p>
      <Swiper
        direction={direction||''}
        className="mySwiper overflow-y-hidden h-[85vh]"
        slidesPerView={3.5}
        mousewheel={true}
        modules={[Mousewheel]}
        pagination={{
          clickable: true,
        }}
      >
        {similar_games.map((e, i) => (
          <SwiperSlide key={i} className="!h-fit mb-7">
            <div
              key={e.id}
              onClick={() => setId(e.id)}
              className="cursor-pointer flex hover:scale-105 duration-300  custom-xl:flex-row items-center custom-xl:items-[unset] flex-col gap-2 p-4 bg-[rgba(0,0,0,0.2)] rounded-2xl"
            >
              <img
                src={e.cover.url}
                alt=""
                className="rounded-2xl w-[150px] h-[150px] object-cover"
              />
              <div className="">
                <p className="text-xl mb-4">{e.name}</p>
                <p>{e.summary && e.summary.slice(0, 100)}...</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Similar;
