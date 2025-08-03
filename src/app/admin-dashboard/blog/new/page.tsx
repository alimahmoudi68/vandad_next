import NewBlogPage from "@/components/pages/dashboard/blog/blog/newBlog/NewBlog";
import ErrorPage from "@/components/common/errorPage/ErrorPage";

//import NotPermission from "@/components/common/notPermission/NotPermission";
//import getUser from '@/utils/common/getUser';
//import havePermission from '@/utils/common/havePermission';

export const metadata = {
    title : 'مقاله جدید'
  }

export default async function NewEstate() {
  //const getUserInfo = await getUser();
  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }


  
    try{
        return (
        <NewBlogPage
        permissions={[]}
        />
        );
    }catch(error){
        return <ErrorPage message="خطایی در سرور رخ داده است" />;
    }
  
  
}
