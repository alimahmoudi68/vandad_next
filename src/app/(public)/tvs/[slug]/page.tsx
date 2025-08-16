import SingleTvPage from "@/components/pages/public/tv/singleTv/SingleTv";
import ErrorPage from "@/components/common/errorPage/ErrorPage";
import { singleTv } from "@/services/public/tvs/tvService";
import { getTvCats } from "@/services/public/tvs/tvCatsService";
import { ITv, ITvCat } from "@/types/tv";
import { IBlogComments } from "@/types/blogComment";

export const metadata = {
  title: "",
  description: "",
};

export default async function SingleTv({
  params,
}: {
 params: Promise<{ slug: string }>;
}) {
  try {
    let {slug} = await params;

    let tv: ITv = {} as ITv;
    let tvCats: ITvCat[] = [];
    let comments: IBlogComments = {} as IBlogComments; 

    const [tvRes, tvCatsRes] = await Promise.allSettled([
      singleTv(slug),
      getTvCats(),
    ]);


    if(tvRes.status === "fulfilled" && tvRes.value.status == 404){
      return(
      <ErrorPage message="" statusCode={404}/>
      );
    }


    if (
      tvRes.status === "fulfilled" &&
      tvRes.value?.status === "success"
     
    ) {
      tv = tvRes.value.tv;
      comments = tvRes.value.commentData;
    }

    if (
      tvCatsRes.status === "fulfilled" &&
      tvCatsRes.value?.status === "success" &&
      Array.isArray(tvCatsRes.value.categories)
    ) {
      tvCats = tvCatsRes.value.categories;
    }

    return <SingleTvPage tv={tv} tvCat={tvCats} comments={comments}/>;
  } catch (err) {
    return <ErrorPage message="خطا در بارگذاری مقاله" statusCode={500} />;
  }
}
