import { redirect } from 'next/navigation'

import LayoutPublic from "@/components/layouts/layoutPublic/LayoutPublic";
import getUser from '@/utils/common/getUser';
import { ReactNode } from 'react';


const Layout = async({ children }: { children: ReactNode }) => {

    const getUserInfo = await getUser();

    //console.log('ss' , getUserInfo)


    const user = {
        id : getUserInfo?.user.id ,
        firstName : getUserInfo?.user.firstName ,
        lastName : getUserInfo?.user.lastName ,
        about: getUserInfo?.user.about ,
        avatar : getUserInfo?.user.avatar ,
        //role : getUserInfo?.user?.['role.title'] ,
        //Permissions : getUserInfo?.user.permissions ,
    }
 
    
    return (
    <LayoutPublic user={ getUserInfo ? user : null} saveToken={{accessToken : getUserInfo?.accessToken || null , refreshToken : getUserInfo?.refreshToken || null}}>
        {children}
    </LayoutPublic>
    );
    
};
export default Layout;
