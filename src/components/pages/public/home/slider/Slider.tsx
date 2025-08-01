"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SliderItem from "@/components/pages/public/home/slider/SliderItem";
import "swiper/css";
import "swiper/css/autoplay";

type SliderProps = {
  sliders: any[];
};

export default function Slider({ sliders }: SliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    console.log("Prev clicked");
    if (swiperRef.current) {
      console.log("Swiper ref exists, calling slidePrev");
      swiperRef.current.slidePrev();
    } else {
      console.log("Swiper ref is null");
    }
  };

  const handleNext = () => {
    console.log("Next clicked");
    if (swiperRef.current) {
      console.log("Swiper ref exists, calling slideNext");
      swiperRef.current.slideNext();
    } else {
      console.log("Swiper ref is null");
    }
  };

  return (
    <div className="w-full md:h-[600px] relative border border-primaryText-100 mb-10">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={500}
        className="w-full h-full rounded-lg"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {sliders &&
          sliders.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <SliderItem
                  classes=""
                  img={item.img}
                  title={item.title}
                  desc={item.subtitle}
                  link={item.link}
                  active={isActive}
                />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="absolute bottom-[40px] md:bottom-[50px] translate-x-[-50%] left-[50%] md:left-auto md:right-4 flex items-center gap-2 z-[1]">
        {/* Prev Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 cursor-pointer stroke-primaryTextLight-100 hover:stroke-primary-100"
          onClick={handleNext}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        {/* Dots */}
        <div className="flex items-center gap-2">
          {sliders.map((_, index) => (
            <div
              key={index}
              className={`rounded-full border border-primaryTextLight-100 duration-[500ms] ${
                index === activeIndex
                  ? "w-[12px] h-[12px] bg-primaryText-100"
                  : "w-[8px] h-[8px] bg-transparent"
              }`}
            />
          ))}
        </div>
        {/* Next Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 cursor-pointer stroke-primaryTextLight-100 hover:stroke-primary-100"
          onClick={handlePrev}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
   
      </div>
    </div>
  );
}
