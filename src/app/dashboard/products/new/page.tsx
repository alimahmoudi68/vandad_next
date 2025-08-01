import NewProductPage from "@/components/pages/dashboard/products/products/newProduct/NewProduct";

import { childCategories } from "@/services/dashboard/products/categoriesService";

//import {getAllAreas} from '@/services/dashboard/areas/areasService'
import NotPermission from "@/components/common/notPermission/NotPermission";
import getUser from "@/utils/common/getUser";
import havePermission from "@/utils/common/havePermission";

export default async function NewEstate() {
  const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  let categoriesData = await childCategories();

  return (
    <NewProductPage
      permissions={getUserInfo?.user?.permissions}
      categories={categoriesData.categories ?? []}
    />
  );
}
