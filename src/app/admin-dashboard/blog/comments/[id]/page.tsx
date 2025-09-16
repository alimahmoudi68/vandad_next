import EditBlogCommentPage from "@/components/pages/adminDashboard/blog/blog/editBlogComment/EditBlogComment";



//import NotPermission from "@/components/common/notPermission/NotPermission";
//import getUser from "@/utils/common/getUser";
//import havePermission from "@/utils/common/havePermission";

interface Params {
  id: string;
}
export default async function EditBlogComment({ params }: { params: Promise<Params> }) {
  //const getUserInfo = await getUser();

  // if(!havePermission(getUserInfo?.user?.permissions ,
  //     ['all_permissions' , 'insert_hotel' , 'insert_selling_together' , 'insert_apartment_sale_presale' , 'insert_rent_mortgage' , 'insert_villa'])
  // ){
  //     return(<NotPermission/>)
  // }

  const { id } = await params;

  return (
    <EditBlogCommentPage id={+id}/>
  );
}
