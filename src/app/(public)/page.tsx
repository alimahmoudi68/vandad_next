import IndexPage from "@/components/pages/public/home/homePage/HomePage";
import { getBlog } from "@/services/public/blog/blogService";
import { getTvs } from "@/services/public/tvs/tvService";
import { IBlog } from "@/types/blog";
import { ITv } from "@/types/tv";
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

    const [blogRes, tvRes] = await Promise.allSettled([
      getBlog(1, 8, ""),
      getTvs(1,8,"")
    ]);

    let blog: IBlog[] = [];
    let tvs: ITv[] = [];

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

    return <IndexPage slider={sliders} blog={blog} tvs={tvs}/>;
  } catch (err) {
    console.log("error");
  }
}
