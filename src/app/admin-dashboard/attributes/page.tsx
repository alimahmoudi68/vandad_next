import AttributesPage from "@/components/pages/dashboard/products/attributes/attributes/Attributes";

import { attributes } from "@/services/dashboard/products/attributesService";

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

  let attributesData = await attributes();

  return (
    <AttributesPage
      permissions={getUserInfo?.user?.permissions}
      attributes={attributesData.attributes ?? []}
    />
  );
}
