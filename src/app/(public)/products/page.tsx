import BlogPage from "@/components/pages/public/blog/blog/Blog";
import { getBlog } from "@/services/public/blog/blogService";
import { getBlogCats } from "@/services/public/blog/blogCatsService";
import { IBlog, IBlogCat } from "@/types/blog";

export const metadata = {
  title: "فروشگاه فاب |‌  خانه",
  description: "",
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  try {
    const params = await searchParams;
    const cat = params.cat || "";

    const [blogRes, blogCatsRes] = await Promise.allSettled([
      getBlog(1, 8, "", cat),
      getBlogCats(),
    ]);

    let blog: IBlog[] = [];
    let blogCats: IBlogCat[] = [];

    if (
      blogRes.status === "fulfilled" &&
      blogRes.value?.status === "success" &&
      Array.isArray(blogRes.value.blogs)
    ) {
      blog = blogRes.value.blogs;
    }

    if (
      blogCatsRes.status === "fulfilled" &&
      blogCatsRes.value?.status === "success" &&
      Array.isArray(blogCatsRes.value.categories)
    ) {
      blogCats = blogCatsRes.value.categories;
    }

    return <BlogPage blog={blog} blogCat={blogCats} />;
  } catch (err) {
    console.log("error");
  }
}
