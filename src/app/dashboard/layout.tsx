import { redirect } from "next/navigation";

import Layout from "@/components/layouts/layoutDashboard/layout/Layout";
import getUser from "@/utils/common/getUser";

import { ReactNode } from "react";
import { IUser } from "@/types/user";

const LayoutDashboard = async ({ children }: { children: ReactNode }) => {
  const getUserInfo = await getUser();

  //console.log('userrr?????' , getUserInfo)

  if (!getUserInfo) {
    redirect("/auth/login");
  }

  const user: IUser = {
    id: getUserInfo.user._id,
    name: getUserInfo.user.name,
    type: getUserInfo.user.type,
    avatar: getUserInfo.user.avatar,
    role: getUserInfo.user?.["role.title"],
    Permissions: getUserInfo.user.permissions,
    firstName: getUserInfo.user.firstName ?? "",
    lastName: getUserInfo.user.lastName ?? "",
    about: getUserInfo.user.about ?? "",
  } as IUser;

  return <Layout user={user} saveToken={{
    accessToken: getUserInfo?.accessToken || null,
    refreshToken: getUserInfo?.refreshToken || null,
  }}>{children}</Layout>;
};
export default LayoutDashboard;
