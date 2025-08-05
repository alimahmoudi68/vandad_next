import CategoriesPage from "@/components/pages/dashboard/course/categories/categories/Categories";

//import NotPermission from "@/components/common/notPermission/NotPermission";
//import getUser from "@/utils/common/getUser";
//import havePermission from "@/utils/common/havePermission";


export const metadata = {
  title : 'دسته بندی دوره‌ها'
}

export default async function courseCats() {
  
  //const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  return (
    <CategoriesPage/>
  );

}