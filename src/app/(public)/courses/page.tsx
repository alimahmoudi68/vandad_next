import CoursesPage from "@/components/pages/public/course/courses/Blog";
import { getCourses } from "@/services/public/courses/courseService";
import { getCourseCats } from "@/services/public/courses/courseCatsService";
import { ICourse, ICourseCat } from "@/types/courses";

export const metadata = {
  title: "فروشگاه فاب |‌  خانه",
  description: "",
};

export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  try {
    const params = await searchParams;
    const cat = params.cat || "";

    const [courseRes, corseCatsRes] = await Promise.allSettled([
      getCourses(1, 8, "", cat),
      getCourseCats(),
    ]);

    let courses: ICourse[] = [];
    let courseCats: ICourseCat[] = [];

    if (
      courseRes.status === "fulfilled" &&
      courseRes.value?.status === "success" &&
      Array.isArray(courseRes.value.courses)
    ) {
      courses = courseRes.value.courses;
    }

    if (
      corseCatsRes.status === "fulfilled" &&
      corseCatsRes.value?.status === "success" &&
      Array.isArray(corseCatsRes.value.categories)
    ) {
      courseCats = corseCatsRes.value.categories;
    }

    return <CoursesPage courses={courses} courseCat={courseCats} />;
  } catch (err) {
    console.log("error");
  }
}
