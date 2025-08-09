import IndexPage from "@/components/pages/public/home/homePage/HomePage";
import { getBlog } from "@/services/public/blog/blogService";
import { IBlog } from "@/types/blog";
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

    const [blogRes] = await Promise.allSettled([getBlog(1, 8, "")]);

    let blog: IBlog[] = [];

    if (
      blogRes.status === "fulfilled" &&
      blogRes.value?.status === "success" &&
      Array.isArray(blogRes.value.blogs)
    ) {
      blog = blogRes.value.blogs;
    }

    return <IndexPage slider={sliders} blog={blog} />;
  } catch (err) {
    console.log("error");
  }
}
