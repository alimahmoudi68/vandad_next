import SingleCoursePage from "@/components/pages/public/course/singleCourse/SingleCourse";
import ErrorPage from "@/components/common/errorPage/ErrorPage";
import { singleCourse } from "@/services/public/courses/courseService";
import { getCourseCats } from "@/services/public/courses/courseCatsService";
import { ICourse, ICourseCat } from "@/types/courses";
import { ICourseComments } from "@/types/courseComment";

export const metadata = {
  title: "دسته بندی",
  description: "",
};

export default async function SingleCourse({
  params,
}: {
 params: Promise<{ slug: string }>;
}) {
  try {
    let {slug} = await params;

    let course: ICourse = {} as ICourse;
    let courseCats: ICourseCat[] = [];
    let comments: ICourseComments = {} as ICourseComments; 

    const [courseRes, courseCatsRes] = await Promise.allSettled([
      singleCourse(slug),
      getCourseCats(),
    ]);


    if(courseRes.status === "fulfilled" && courseRes.value.status == 404){
      return(
      <ErrorPage message="" statusCode={404}/>
      );
    }


    if (
      courseRes.status === "fulfilled" &&
      courseRes.value?.status === "success"
     
    ) {
      course = courseRes.value.course;
      comments = courseRes.value.commentData;
    }

    if (
      courseCatsRes.status === "fulfilled" &&
      courseCatsRes.value?.status === "success" &&
      Array.isArray(courseCatsRes.value.categories)
    ) {
      courseCats = courseCatsRes.value.categories;
    }

    return <SingleCoursePage course={course} courseCat={courseCats} comments={comments}/>;
  } catch (err) {
    return <ErrorPage message="خطا در بارگذاری مقاله" statusCode={500} />;
  }
}
