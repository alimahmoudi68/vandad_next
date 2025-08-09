"use client";
import React from "react";
import Link from "next/link";

import NewBlog from "@/components/pages/public/home/newBlog/NewBlog";
import { IBlog, IBlogCat } from "@/types/blog";
import BlogCard from "@/components/common/blogCard/BlogCard";

export const metadata = {
  title: 'ونداد | مقالات',
  description: '',
}


type IndexPageProps = {
  blog: IBlog[];
  blogCat: IBlogCat[];
};

export default function IndexPage({ blog, blogCat }: IndexPageProps) {

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px] flex flex-wrap gap-x-[20px]">
        <div className='w-full lg:w-[calc(75%-10px)] flex flex-wrap gap-[20px] xl:gap-[30px] 2xl:gap-[15px] order-1 lg:order-2'>
          {
            blog.map((blog , index)=>(
              <BlogCard
                key={index}
                classes="w-full sm:w-[calc(50%-10px)] xl:w-[calc(33.33%-10px)] 2xl:w-[calc(25%-20px)]"
                title={blog.title}
                image={blog.image}
                slug={blog.slug}
                categories={blog.categories}
              />
            ))
          }
        </div>
        <div className='w-full lg:w-[calc(25%-10px)] max-w-[200px] order-2 lg:order-1 bg-white-100 rounded-[10px] p-[20px]'>
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
