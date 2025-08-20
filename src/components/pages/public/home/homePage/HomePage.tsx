"use client";
import React from "react";

import Slider from "@/components/pages/public/home/slider/Slider";
import NewBlog from "@/components/pages/public/home/newBlog/NewBlog";
import NewTvs from "@/components/pages/public/home/newTvs/NewTvs";
import NewCourses from "@/components/pages/public/home/newCourses/NewCourses";
import { IBlog } from "@/types/blog";
import { ITv } from "@/types/tv";
import { ICourse } from "@/types/courses";
import{ ISlider } from "@/types/slider";

export const metadata = {
  title: 'ونداد | صفحه اصلی',
  description: '',
}


type IndexPageProps = {
  slider: ISlider[];
  blog: IBlog[];
  tvs: ITv[];
  courses: ICourse[]
};

export default function IndexPage({ slider, blog, tvs, courses }: IndexPageProps) {

  console.log('courses' , courses)

  return (
    <>
      <div className="container mx-auto">
        <Slider sliders={slider} />
        <NewBlog blog={blog} /> 
        <NewTvs tvs={tvs} /> 
        <NewCourses courses={courses} /> 

        {/* <AmazingProducts products={amazingProduct} showMenu={false} /> */}
        {/* <NewProduct products={newProducts} /> */}
      </div>

      {/* <Categories/> */}
      {/* <CustomerCumments showVideo={(video)=>showVideoCommentHandler(video)}/> */}
    </>
  );

}
