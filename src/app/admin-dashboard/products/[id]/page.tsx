//import { notFound } from "next/navigation";

import EditProductPage from "@/components/pages/dashboard/products/products/editProduct/EditProduct";
//import { childCategories } from "@/services/dashboard/products/categoriesService";
//import { singleProduct } from "@/services/dashboard/products/productsService";

//import {getAllAreas} from '@/services/dashboard/areas/areasService'
//import NotPermission from "@/components/common/notPermission/NotPermission";
//import getUser from "@/utils/common/getUser";
//import havePermission from "@/utils/common/havePermission";

interface Params {
  id: string;
}

export default async function NewEstate({ params }: { params: Params }) {
  let id = params.id;

  //const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  //let categoriesData = await childCategories();
  //let productData = await singleProduct(id);

  // if (productData.status == "error") {
  //   if (productData.msg == "محصول یافت نشد") {
  //     notFound();
  //   }

  //   if (productData.msg == "شناسه محصول نامعتبر است") {
  //     notFound();
  //   }
  // }

  //console.log('productData' , productData)

  return (
    <EditProductPage id={id}/>
  );
}
