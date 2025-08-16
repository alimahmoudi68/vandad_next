'use client'
import React from "react";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';
import { useSelector } from "react-redux";


import { IBlog, IBlogCat } from "@/types/blog";
import { IBlogComments } from "@/types/blogComment";
import ShowImg from "@/components/common/showImg/ShowImg";
import Comments from "@/components/common/comment/Comment";
import { RootState } from "@/store";

export const metadata = {
  title: 'ونداد | مقالات',
  description: '',
}


type SingleBlogPageProps = {
  blog: IBlog;
  blogCat: IBlogCat[];
  comments: IBlogComments
};

export default function SingleBlogPage({ blog, blogCat, comments }: SingleBlogPageProps) {

  //console.log('blogCat', blogCat);

  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="container mx-auto flex flex-wrap gap-x-[20px]">
        <div className='w-full lg:w-[calc(75%-10px)] flex flex-col gap-y-[20px] order-1 lg:order-2'>
          
          <div className="bg-white-100 rounded-[10px] p-[20px] border border-borderLight-100">
            <div className="w-full h-[250px] md:h-[500px] mb-4 md:mb-8">
            <ShowImg classes="w-full h-auto rounded-md object-cover" bucketName={blog?.image?.bucket} fileName={blog?.image?.location} width={1000} height={1000} fill={true}/>
            </div>
            <h1 className="text-primaryText-100 font-bold text-[1.1rem] md:text-[1.2rem] mb-3">
              {blog.title}
            </h1>
            <div className="w-full flex items-center gap-1 mb-3">
              <span className="text-[0.8rem]">دسته بندی:</span>
              {
                blogCat.map((cat: IBlogCat ,index: number)=>(
                  <Link key={index} href={`/blog/category/${cat.slug}`} className="text-secondaryText-100 text-[0.8rem] rounded-md hover:text-primary-100 duration-300">
                    #{cat.title}
                  </Link>
                ))
              }
            </div>   
            <div
              className="text-sm leading-[2rem] text-[1rem] text-justify"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
            />
          </div>

          <div className="bg-white-100 rounded-[10px] p-[20px] border border-borderLight-100">  
            {
              <Comments data={comments} canRes={user ? true : false} user={user} blogId={blog.id} type={'blog'}/>
            }
          </div>

        </div>
        <div className='w-full h-fit lg:w-[calc(25%-10px)] order-2 lg:order-1 bg-white-100 rounded-[10px] p-[20px] border border-borderLight-100'>
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
