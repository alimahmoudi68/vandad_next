import React from "react";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';



import NewBlog from "@/components/pages/public/home/newBlog/NewBlog";
import { IBlog, IBlogCat } from "@/types/blog";
import { IBlogComments } from "@/types/blogComment";
import BlogCard from "@/components/common/blogCard/BlogCard";
import ShowImg from "@/components/common/showImg/ShowImg";
import Comments from "@/components/common/comment/Comment";

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

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px] flex flex-wrap gap-x-[20px]">
        <div className='w-full lg:w-[calc(75%-10px)] grow flex flex-col order-1 lg:order-2 bg-white-100 rounded-[10px] p-[20px]'>
          <div className="w-full h-[500] mb-2 md:mb-4">
          <ShowImg classes="w-full h-auto" bucketName={blog?.image?.bucket} fileName={blog?.image?.location} width={1000} height={1000} fill={true}/>
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
            className="text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />

          <div className="bg-red-400">  
            {
              <Comments data={comments} canRes={true} blogId={blog.id}/>
            }
          </div>

        </div>
        <div className='w-full lg:w-[calc(25%-10px)] order-2 lg:order-1 bg-white-100 rounded-[10px] p-[20px]'>
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
