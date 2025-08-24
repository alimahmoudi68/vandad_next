"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { ITv } from "@/types/tv";
import TvCard from "@/components/common/tvCard/TvCard";

// تعریف نوع props کامپوننت
interface NewTvsProps {
  tvs: ITv[];
}

const NewTvs: React.FC<NewTvsProps> = ({ tvs }) => {
  return (
    <div className="w-full mb-10 md:mb-20">
      <div className="w-full flex justify-between items-center mb-2 md:mb-4">
        <div className="flex text-primaryText-100 font-bold text-[1.2rem] md:text-[1.5rem] text-center mb-3">
          ویدیو‌های
          <span className="text-primary-100 mr-1 block">جدید</span>
        </div>
        <a
          href="/tvs"
          className="font-light text-primaryText-100 justify-center hover:text-primary-100"
        >
          مشاهده همه
        </a>
      </div>
      <div className="w-full">
        <Swiper
          modules={[]} // در صورت نیاز ماژول‌ها را اضافه کنید
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {tvs.map((tv) => (
            <SwiperSlide key={tv.id}>
              <TvCard
                classes="w-full"
                title={tv.title}
                image={tv.image}
                slug={tv.slug}
                categories={tv.categories}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewTvs;
