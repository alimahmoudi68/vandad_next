"use client";
import React, {useState} from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { ICourse, ICourseCat } from "@/types/courses";
import { ICourseComments } from "@/types/courseComment";
import ShowImg from "@/components/common/showImg/ShowImg";
import Comments from "@/components/common/comment/Comment";
import { RootState } from "@/store";
import CourseProperty from "@/components/pages/public/course/singleCourse/CourseProperty";
import ModalCourseVideo from "@/components/modals/public/modalCourseVideo/ModalCourseVideo";
import EpispdeCard from "@/components/pages/public/course/singleCourse/EpispdeCard";
import Card2 from "@/components/common/card/Card2";
import ExpandableText from "@/components/common/expandableText/ExpandableText";
import FAQAccordion from "@/components/common/faq/Faq";



export const metadata = {
  title: "ونداد | مقالات",
  description: "",
};

type SingleCoursePageProps = {
  course: ICourse;
  courseCat: ICourseCat[];
  comments: ICourseComments;
};

export default function SingleCoursePage({
  course,
  courseCat,
  comments,
}: SingleCoursePageProps) {

  console.log('course', course);

  const { user } = useSelector((state: RootState) => state.auth);

  const [showModalVideo, setShowModalVideo] = useState(false);
  
  const stateModalVideo = (state: boolean) => {
    setShowModalVideo(state);
  }

  return (
    <>
      {
        showModalVideo ? 
        (
            <ModalCourseVideo
            close={() => setShowModalVideo(false)}
            videoUrl={course.title}
            />
        )
        :
        (
            null
        )
      }
      <div className="container mx-auto flex flex-wrap gap-[20px]">
        <div className="w-full h-fit lg:w-[calc(30%-10px)] lg:max-w-[300px] bg-white-100 dark:bg-cardDark-100 rounded-[10px] p-[20px] lg:sticky lg:top-[130px]">
          <div className="relative cursor-pointer mb-8" onClick={()=>stateModalVideo(true)}>
            <ShowImg
              classes="w-full h-auto rounded-md object-cover blur-xs"
              bucketName={course?.image?.bucket}
              fileName={course?.image?.location}
              width={1000}
              height={1000}
              fill={false}
            />
            <div className="flex flex-col gap-y-2 items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="w-[32px] h-[32px] flex items-center justify-center bg-white-30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-[24px] h-[24px] fill-white-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
              <span className="text-white-70">فیلم معرفی دوره</span>
            </div>
          </div>
          <CourseProperty
          keyTitle= "جلسه"
          value = "1"
          icon= "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
          />
          <CourseProperty
          keyTitle= "ساعت"
          value = "1"
          icon= "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <CourseProperty
          keyTitle= "دانشجو"
          value = "144"
          icon= "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
          <div className="px-4 py-2 bg-primary-100 text-white-100 border border-primary-100 hover:bg-transparent hover:text-primary-100 duration-300 cursor-pointer font-bold text-center rounded-lg">
            ثبت نام
          </div>
        </div>
        <div className='w-full lg:w-[calc(70%-10px)] grow flex flex-wrap gap-[20px] xl:gap-[30px] 2xl:gap-[15px]'>
          <div className="w-full bg-white-100 dark:bg-cardDark-100 rounded-[10px] p-[20px]">
            <h1 className="text-primaryText-100 font-bold text-[1.1rem] md:text-[1.2rem] mb-3">
              {course.title}
            </h1>
            <div className="w-full flex items-center gap-1 mb-3 ">
              <span className="text-[0.8rem]">دسته بندی:</span>
              {course.categories.map((cat: ICourseCat, index: number) => (
                <Link
                  key={index}
                  href={`/blog/category/${cat.slug}`}
                  className="text-secondaryText-100 text-[0.8rem] rounded-md hover:text-primary-100 duration-300"
                >
                  #{cat.title}
                </Link>
              ))}
            </div>
            <ExpandableText
            text={course.content}
            previewChars={400}
            moreLabel="نمایش بیشتر"
            lessLabel="مخفی کردن" // اگر نخواهید «کمتر» داشته باشید => null
            className="text-gray-800"
            />
         
          </div>

          <Card2 title="جلسات دوره" classes="w-full">
            <div className="w-full flex flex-col gap-y-3">
              {
                course.episodes.map((episode , index)=>(
                  <EpispdeCard 
                  key = {index}
                  number={index+1}
                  title={episode.title}
                  time={episode.time}
                  date={episode.date}
                  content={episode.content}
                  price={episode.price}
                  />
                ))
              }
            </div>
          </Card2>
          <Card2 title="سوالات متداول" classes="w-full">
            <div className="w-full flex flex-col gap-y-3">
            <FAQAccordion items={course.faqs} classes="w-full"/>
            </div>
          </Card2>
          {
            <Comments
              data={comments}
              canRes={user ? true : false}
              user={user}
              courseId={course.id}
              type={"course"}
            />
          }
        </div>
      
      </div>
    </>
  );
}
