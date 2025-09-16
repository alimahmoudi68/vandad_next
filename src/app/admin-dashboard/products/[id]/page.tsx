import { notFound } from "next/navigation";
import EditProductPage from "@/components/pages/adminDashboard/products/products/editProduct/EditProduct";
import { childCategories } from "@/services/adminDashboard/products/categoriesService";
import { singleProduct } from "@/services/adminDashboard/products/productsService";

//import {getAllAreas} from '@/services/dashboard/areas/areasService'
//import NotPermission from "@/components/common/notPermission/NotPermission";
//import getUser from "@/utils/common/getUser";
//import havePermission from "@/utils/common/havePermission";

interface Params {
  id: string;
}

export default async function NewEstate({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  //const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  const [categoriesData, productData] = await Promise.all([
    childCategories(),
    singleProduct(id),
  ]);

  if (productData.status == "error") {
    if (productData.msg == "محصول یافت نشد") {
      notFound();
    }

    if (productData.msg == "شناسه محصول نامعتبر است") {
      notFound();
    }
  }

  //console.log('productData' , productData)

  return (
    <EditProductPage id={id}
    categories={categoriesData?.categories ?? []}
    product={productData?.product}
    />
  );
}
