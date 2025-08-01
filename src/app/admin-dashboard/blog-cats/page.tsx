import CategoriesPage from "@/components/pages/dashboard/blog/categories/categories/Categories";
import ErrorPage from "@/components/common/errorPage/ErrorPage";
import { getBlogCats } from "@/services/dashboard/blog/blogCatsService";

//import NotPermission from "@/components/common/notPermission/NotPermission";
//import getUser from "@/utils/common/getUser";
//import havePermission from "@/utils/common/havePermission";

export default async function Categories() {
  try {
    //const getUserInfo = await getUser();

    // if(!havePermission(getUserInfo?.user?.permissions ,
    //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
    // ){
    //     return(<NotPermission/>)
    // }

    let categoriesData = await getBlogCats();

    return (
      <CategoriesPage
        permissions={[]}
        categories={categoriesData.categories ?? []}
      />
    );
  } catch (error: any) {
    return <ErrorPage message="خطایی در سرور رخ داده است" />;
  }
}
