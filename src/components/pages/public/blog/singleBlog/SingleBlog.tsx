"use client";
import React from "react";
import Link from "next/link";
import DOMPurify from 'dompurify';

import NewBlog from "@/components/pages/public/home/newBlog/NewBlog";
import { IBlog, IBlogCat } from "@/types/blog";
import BlogCard from "@/components/common/blogCard/BlogCard";
import ShowImg from "@/components/common/showImg/ShowImg";

export const metadata = {
  title: 'ونداد | مقالات',
  description: '',
}


type SingleBlogPageProps = {
  blog: IBlog;
  blogCat: IBlogCat[];
};

export default function SingleBlogPage({ blog, blogCat }: SingleBlogPageProps) {

  console.log('b' , blog)

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px] flex flex-wrap gap-x-[20px]">
        <div className='w-full lg:w-[calc(75%-10px)] grow flex flex-wrap order-1 lg:order-2 bg-white-100 rounded-[10px] p-[20px]'>
          <div className="w-full h-[500] mb-2 md:mb-4">
          <ShowImg classes="w-full h-auto" bucketName={blog?.image?.bucket} fileName={blog?.image?.location} width={1000} height={1000} fill={true}/>
          </div>
          <h1 className="text-primaryText-100 font-bold text-[1.1rem] md:text-[1.2rem]">
            {blog.title}
          </h1>   
          <div
            className="text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />

        </div>
        <div className='w-full lg:w-[calc(25%-10px)] max-w-[300px] order-2 lg:order-1 bg-white-100 rounded-[10px] p-[20px]'>
          <ul className="flex flex-col gap-[10px]">
            {
              blogCat.map((cat , index)=>(
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
