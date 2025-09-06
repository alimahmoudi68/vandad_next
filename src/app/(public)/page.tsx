import IndexPage from "@/components/pages/public/home/homePage/HomePage";
import { getBlog } from "@/services/public/blog/blogService";
import { getTvs } from "@/services/public/tvs/tvService";
import { getCourses } from "@/services/public/courses/courseService";
import { getProducts } from "@/services/public/products/productService";
import { IBlog } from "@/types/blog";
import { ITv } from "@/types/tv";
import { ICourse } from "@/types/courses";
import { IProduct } from "@/types/products";
import { ISlider } from "@/types/slider";

export const metadata = {
  title: "فروشگاه فاب |‌  خانه",
  description: "",
};

export default async function Home() {
  try {
    const sliders: ISlider[] = [
      {
        img: "shop/slider%2Fs1.jpg",
        title: "فروشگاه فاب",
        subtitle: "فروشگاه فاب",
        link: "/",
      },
      {
        img: "shop/slider%2Fs2.jpg",
        title: "فروشگاه فاب",
        subtitle: "فروشگاه فاب",
        link: "/",
      },
    ];

    const [blogRes, tvRes, coursesRes , productsRes] = await Promise.allSettled([
      getBlog(1, 8, "" , ""),
      getTvs(1,8,"",""),
      getCourses(1,8,"",""),
      getProducts(1,8,"",""),
    ]);

    let blog: IBlog[] = [];
    let tvs: ITv[] = [];
    let courses: ICourse[] = [];
    let products: IProduct[] = [];

    if (
      blogRes.status === "fulfilled" &&
      blogRes.value?.status === "success" &&
      Array.isArray(blogRes.value.blogs)
    ) {
      blog = blogRes.value.blogs;
    }

    if (
      tvRes.status === "fulfilled" &&
      tvRes.value?.status === "success" &&
      Array.isArray(tvRes.value.tvs)
    ) {
      tvs = tvRes.value.tvs;
    }


    if (
      coursesRes.status === "fulfilled" &&
      coursesRes.value?.status === "success" &&
      Array.isArray(coursesRes.value.courses)
    ) {
      courses = coursesRes.value.courses;
    }


    
    if (
      productsRes.status === "fulfilled" &&
      productsRes.value?.status === "success" &&
      Array.isArray(productsRes.value.products)
    ) {
      products = productsRes.value.products;
    }


    return <IndexPage slider={sliders} blog={blog} tvs={tvs} courses={courses} products={products} />;
  } catch (err) {
    console.log("error");
  }
}
