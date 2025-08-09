import SingleBlogPage from "@/components/pages/public/blog/singleBlog/SingleBlog";
import ErrorPage from "@/components/common/errorPage/ErrorPage";
import { singleBlog } from "@/services/public/blog/blogService";
import { getBlogCats } from "@/services/public/blog/blogCatsService";
import { IBlog, IBlogCat } from "@/types/blog";

export const metadata = {
  title: "دسته بندی",
  description: "",
};

export default async function CatSlug({
  params,
}: {
 params: Promise<{ slug: string }>;
}) {
  try {
    let {slug} = await params;

    const [blogRes, blogCatsRes] = await Promise.allSettled([
      singleBlog(slug),
      getBlogCats(),
    ]);


    if(blogRes.status === "fulfilled" && blogRes.value.status == 404){
      return(
      <ErrorPage message="" statusCode={404}/>
      );
    }

    let blog: IBlog = {} as IBlog;
    let blogCats: IBlogCat[] = [];

    if (
      blogRes.status === "fulfilled" &&
      blogRes.value?.status === "success"
     
    ) {
      blog = blogRes.value.blog;
    }

    if (
      blogCatsRes.status === "fulfilled" &&
      blogCatsRes.value?.status === "success" &&
      Array.isArray(blogCatsRes.value.categories)
    ) {
      blogCats = blogCatsRes.value.categories;
    }

    return <SingleBlogPage blog={blog} blogCat={blogCats} />;
  } catch (err) {
    return <ErrorPage message="خطا در بارگذاری مقاله" statusCode={500} />;
  }
}
