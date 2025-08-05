import EditCategoryPage from "@/components/pages/dashboard/course/categories/editCategory/EditCategory";

// import NotPermission from "@/components/common/notPermission/NotPermission";
// import getUser from "@/utils/common/getUser";
// import havePermission from "@/utils/common/havePermission";

interface Params {
  id: string;
}

export default async function EditCategory({ params }: { params: Params }) {
  //const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  let id = params.id;

  return (
    <EditCategoryPage id={id}/>
  );
}
