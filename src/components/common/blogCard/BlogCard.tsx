import {useState , useEffect} from "react";
import ShowImg from "@/components/common/showImg/ShowImg";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IBlogCat } from "@/types/blog";

interface BlogCardProps{
  classes: string  , 
  slug: string ,  
  image: {
    bucket: string,
    location: string
  }, 
  title: string, 
  categories : IBlogCat[]
}

export default function BlogCard({classes  , slug ,  image , title, categories } : BlogCardProps){

  console.log("blog card", categories);
  
  return(
    <div className={`${classes} border dark:border-dark-25 bg-white-100 dark:bg-dark-25 flex flex-col items-start rounded-md`}>
      <Link href={`/blog/${slug}`} className="w-full h-full">
      <ShowImg alt={title} width={500} height={500} bucketName={image.bucket} fileName={image.location} classes="w-full h-auto mb-2 rounded-md"/>
      </Link>
      <div className="w-full p-3">
        <Link href={`/blog/${slug}`} className="w-full h-full">
          <h2 className="text-primartText-100 text-[1rem]  mb-2">{title}</h2>
        </Link>
        <div className="w-full flex items-center justify-end">
          {
            categories.map((cat: IBlogCat ,index: number)=>(
              <Link key={index} href={`/blog/category/${cat.slug}`} className="text-secondaryText-100 text-[0.8rem] border px-2 py-1 rounded-md hover:opacity-70 duration-300">
                {cat.title}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}