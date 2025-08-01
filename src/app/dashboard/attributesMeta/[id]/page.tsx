import EditAttributeMetaPage from "@/components/pages/dashboard/products/attributesMeta/editAttributeMeta/EditAttributeMeta";

import { attributes } from "@/services/dashboard/products/attributesService";
import { singleAttributeMeta } from "@/services/dashboard/products/attributesMetaService";

import NotPermission from "@/components/common/notPermission/NotPermission";
import getUser from "@/utils/common/getUser";
import havePermission from "@/utils/common/havePermission";

interface Params {
  id: string;
}

export default async function EditCategory({ params }: { params: Params }) {
  const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  let id = params?.id;
  let attributeMetaData = await singleAttributeMeta(id);
  let attributesData = await attributes();

  return (
    <EditAttributeMetaPage
      permissions={getUserInfo?.user?.permissions}
      attributeMeta={attributeMetaData.attributeMeta ?? {}}
      attributes={attributesData.attributes ?? []}
      id={id}
    />
  );
}
