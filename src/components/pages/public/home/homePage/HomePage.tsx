"use client";
import React from "react";
import Slider from "@/components/pages/public/home/slider/Slider";

type IndexPageProps = {
  sliders: any[];
};

export default function IndexPage({ sliders }: IndexPageProps) {

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px]">
        <Slider sliders={sliders} />

        {/* <AmazingProducts products={amazingProduct} showMenu={false} /> */}
        {/* <NewProduct products={newProducts} /> */}
      </div>

      {/* <Categories/> */}
      {/* <CustomerCumments showVideo={(video)=>showVideoCommentHandler(video)}/> */}
    </>
  );
}
