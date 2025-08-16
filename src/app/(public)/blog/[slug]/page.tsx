import SingleBlogPage from "@/components/pages/public/blog/singleBlog/SingleBlog";
import ErrorPage from "@/components/common/errorPage/ErrorPage";
import { singleBlog } from "@/services/public/blog/blogService";
import { getBlogCats } from "@/services/public/blog/blogCatsService";
import { IBlog, IBlogCat } from "@/types/blog";
import { IBlogComments } from "@/types/blogComment";

export const metadata = {
  title: "دسته بندی",
  description: "",
};

export default async function SingleTv({
  params,
}: {
 params: Promise<{ slug: string }>;
}) {
  try {
    let {slug} = await params;

    let blog: IBlog = {} as IBlog;
    let blogCats: IBlogCat[] = [];
    let comments: IBlogComments = {} as IBlogComments; 

    const [blogRes, blogCatsRes] = await Promise.allSettled([
      singleBlog(slug),
      getBlogCats(),
    ]);


    if(blogRes.status === "fulfilled" && blogRes.value.status == 404){
      return(
      <ErrorPage message="" statusCode={404}/>
      );
    }


    if (
      blogRes.status === "fulfilled" &&
      blogRes.value?.status === "success"
     
    ) {
      blog = blogRes.value.blog;
      comments = blogRes.value.commentData;
    }

    if (
      blogCatsRes.status === "fulfilled" &&
      blogCatsRes.value?.status === "success" &&
      Array.isArray(blogCatsRes.value.categories)
    ) {
      blogCats = blogCatsRes.value.categories;
    }

    return <SingleBlogPage blog={blog} blogCat={blogCats} comments={comments}/>;
  } catch (err) {
    return <ErrorPage message="خطا در بارگذاری مقاله" statusCode={500} />;
  }
}
