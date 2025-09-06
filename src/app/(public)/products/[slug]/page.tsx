import SingleProductPage from "@/components/pages/public/products/singleProductPage/SingleProductPAge";
import ErrorPage from "@/components/common/errorPage/ErrorPage";
import { singleBlog } from "@/services/public/blog/blogService";
import { IProduct, IProductCat } from "@/types/products";
import { IBlogComments } from "@/types/blogComment";
import { singleProduct } from "@/services/public/products/productService";

export const metadata = {
  title: "محصول",
  description: "",
};

export default async function SingleProduct({
  params,
}: {
 params: Promise<{ slug: string }>;
}) {
  try {
    let {slug} = await params;

    let product: IProduct = {} as IProduct;
    // let blogCats: IBlogCat[] = [];
    // let comments: IBlogComments = {} as IBlogComments; 

    const [productRes] = await Promise.allSettled([
      singleProduct(slug),
    ]);


    if(productRes.status === "fulfilled" && productRes.value.status == 404){
      return(
      <ErrorPage message="" statusCode={404}/>
      );
    }


    if (
      productRes.status === "fulfilled" &&
      productRes.value?.status === "success"
     
    ) {
      product= productRes.value.product;
      //comments = blogRes.value.commentData;
    }

    // if (
    //   blogCatsRes.status === "fulfilled" &&
    //   blogCatsRes.value?.status === "success" &&
    //   Array.isArray(blogCatsRes.value.categories)
    // ) {
    //   blogCats = blogCatsRes.value.categories;
    // }

    return <SingleProductPage product={product}/>;
  } catch (err) {
    return <ErrorPage message="خطا در بارگذاری مقاله" statusCode={500} />;
  }
}
