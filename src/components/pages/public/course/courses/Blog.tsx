"use client";
import React from "react";
import Link from "next/link";

import { ICourse, ICourseCat } from "@/types/courses";
import CourseCard from "@/components/common/courseCard/CourseCard";

export const metadata = {
  title: 'ونداد | دوره‌ها',
  description: '',
}

type CoursesPageProps = {
  courses: ICourse[];
  courseCat: ICourseCat[];
};

export default function CoursesPage({ courses, courseCat }: CoursesPageProps) {

  //console.log('course car', courseCat)

  return (
    <>
      <div className="container mx-auto flex flex-wrap gap-x-[20px]">
        <h1 className="w-full text-primaryText-100 text-2xl font-bold mb-4">
          دوره‌ها
        </h1>
        <div className='w-full lg:w-[calc(75%-10px)] grow flex flex-wrap gap-[20px] xl:gap-[30px] 2xl:gap-[15px] order-1 lg:order-2'>
          {
            courses.map((course , index)=>(
              <CourseCard
                key={index}
                classes="w-full sm:w-[calc(50%-10px)] xl:w-[calc(33.33%-10px)] 2xl:w-[calc(25%-20px)]"
                title={course.title}
                image={course.image}
                slug={course.slug}
                categories={course.categories}
              />
            ))
          }
        </div>
        <div className='w-full h-fit lg:w-[calc(25%-10px)] lg:max-w-[300px] order-2 lg:order-1 bg-white-100 dark:bg-cardDark-100 rounded-[10px] p-[20px]'>
          <div className="flex items-center gap-2 mb-4 relative">
            <div className="w-[8px] h-[24px] bg-primary-100 absolute right-[-20px] top-[50%] translate-y-[-50%]">
            </div>
            <span className="w-full block text-primaryText-100 text-lg font-bold">
            دسته‌بندی‌ها
            </span>
          </div>
    
          <ul className="flex flex-col gap-[10px]">
            {
              courseCat.map((cat , index)=>(
              <li key={index}>
                <Link href={`/courses?cat=${cat.slug}`} className='hover:text-primary-100 duration-200'>
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
