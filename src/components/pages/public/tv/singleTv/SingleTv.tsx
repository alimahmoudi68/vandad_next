import React from "react";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';



import NewBlog from "@/components/pages/public/home/newBlog/NewBlog";
import { ITv, ITvCat } from "@/types/tv";
import { ITvComments } from "@/types/tvComment";
import BlogCard from "@/components/common/blogCard/BlogCard";
import ShowImg from "@/components/common/showImg/ShowImg";
import Comments from "@/components/common/comment/Comment";
import LazyVideoPlayer from "@/components/common/lazyVideoPlayer/LazyVideoPlayer";

export const metadata = {
  title: 'ونداد | مقالات',
  description: '',
}


type SingleBlogPageProps = {
  tv: ITv;
  tvCat: ITvCat[];
  comments: ITvComments
};

export default function SingleBlogPage({ tv, tvCat, comments }: SingleBlogPageProps) {

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px] flex flex-wrap gap-x-[20px]">
        <div className='w-full lg:w-[calc(75%-10px)] flex flex-col gap-y-[20px] order-1 lg:order-2'>
          
          <div className="bg-white-100 rounded-[10px] p-[20px]">

            <LazyVideoPlayer
              directUrl="https://minio.example.com/mybucket/videos/sample.mp4"
              poster="/images/video-thumb.jpg"
            />

            <h1 className="text-primaryText-100 font-bold text-[1.1rem] md:text-[1.2rem] mb-3">
              {tv.title}
            </h1>
            <div className="w-full flex items-center gap-1 mb-3">
              <span className="text-[0.8rem]">دسته بندی:</span>
              {
                tvCat.map((cat: ITvCat ,index: number)=>(
                  <Link key={index} href={`/tv/category/${cat.slug}`} className="text-secondaryText-100 text-[0.8rem] rounded-md hover:text-primary-100 duration-300">
                    #{cat.title}
                  </Link>
                ))
              }
            </div>   
            <div
              className="text-sm leading-6"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tv.content) }}
            />
          </div>

          <div className="bg-white-100 rounded-[10px] p-[20px]">  
            {
              <Comments data={comments} canRes={true} tvId={tv.id} type={'tv'}/>
            }
          </div>

        </div>
        <div className='w-full h-fit lg:w-[calc(25%-10px)] order-2 lg:order-1 bg-white-100 rounded-[10px] p-[20px]'>
          <ul className="flex flex-col gap-[10px]">
            {
              tvCat.map((cat , index)=>(
              <li key={index}>
                <Link href={`/blog/categories/${cat.slug}`} className='hover:text-primary-100 duration-200'>
                  {cat.title}
                </Link>
              </li>
              ))
            }
          </ul>
        </div>

      </div>
    </>
  );

}
