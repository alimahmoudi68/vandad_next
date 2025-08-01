import CategoriesPage from "@/components/pages/dashboard/products/categories/categories/Categories";

import { categories } from "@/services/dashboard/products/categoriesService";

import NotPermission from "@/components/common/notPermission/NotPermission";
import getUser from "@/utils/common/getUser";
import havePermission from "@/utils/common/havePermission";

export default async function Categories() {
  const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  let categoriesData = await categories();

  //console.log('categoriesData' , categoriesData)

  return (
    <CategoriesPage
      permissions={getUserInfo?.user?.permissions}
      categories={categoriesData.categories ?? []}
    />
  );
}
