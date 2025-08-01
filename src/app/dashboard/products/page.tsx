import ProductsPage from "@/components/pages/dashboard/products/products/productsPage/ProductsPage";

import { products } from "@/services/dashboard/products/productsService";

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

  let productsData = await products();

  console.log("productsData", productsData.products?.data);

  return (
    <ProductsPage
      permissions={getUserInfo?.user?.permissions}
      products={productsData.products?.data ?? []}
    />
  );
}
