"use client";
import React from "react";

import Slider from "@/components/pages/public/home/slider/Slider";
import NewBlog from "@/components/pages/public/home/newBlog/NewBlog";
import { IBlog } from "@/types/blog";
import{ ISlider } from "@/types/slider"

export const metadata = {
  title: 'ونداد | صفحه اصلی',
  description: '',
}


type IndexPageProps = {
  slider: ISlider[];
  blog: IBlog[];
};

export default function IndexPage({ slider, blog }: IndexPageProps) {

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px]">
        <Slider sliders={slider} />
        <NewBlog blog={blog} /> 

        {/* <AmazingProducts products={amazingProduct} showMenu={false} /> */}
        {/* <NewProduct products={newProducts} /> */}
      </div>

      {/* <Categories/> */}
      {/* <CustomerCumments showVideo={(video)=>showVideoCommentHandler(video)}/> */}
    </>
  );

}
