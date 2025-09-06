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
import TopTitr from "./TopTitr";
import { IProduct } from "@/types/products";
import NewProducts from "../newProducts/NewProducts";

export const metadata = {
  title: 'ونداد | صفحه اصلی',
  description: '',
}


type IndexPageProps = {
  slider: ISlider[];
  blog: IBlog[];
  tvs: ITv[];
  courses: ICourse[];
  products: IProduct[];
};

export default function IndexPage({ slider, blog, tvs, courses, products }: IndexPageProps) {

  //console.log('courses' , courses)
  //console.log('products' , products)

  return (
    <>
      <div className="container mx-auto">
        <TopTitr/>
        {/* <Slider sliders={slider} /> */}
        <NewBlog blog={blog} /> 
        <NewTvs tvs={tvs} /> 
        <NewCourses courses={courses} /> 
        <NewProducts products={products} /> 
        {/* <AmazingProducts products={amazingProduct} showMenu={false} /> */}
        {/* <NewProduct products={newProducts} /> */}
      </div>

      {/* <Categories/> */}
      {/* <CustomerCumments showVideo={(video)=>showVideoCommentHandler(video)}/> */}
    </>
  );

}
