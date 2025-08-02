import { redirect } from "next/navigation";

import Layout from "@/components/layouts/layoutDashboard/layout/Layout";
import getUser from "@/utils/common/getUser";

import { ReactNode } from "react";

const LayoutDashboard = async ({ children }: { children: ReactNode }) => {
  const getUserInfo = await getUser();

  //console.log('userrr?????' , getUserInfo)

  if (!getUserInfo) {
    redirect("/auth/login");
  }

  const user = {
    id: getUserInfo?.user._id,
    name: getUserInfo?.user.name,
    type: getUserInfo?.user.type,
    avatar: getUserInfo?.user.avatar,
    role: getUserInfo?.user?.["role.title"],
    Permissions: getUserInfo?.user.permissions,
  };

  return <Layout user={getUserInfo ? user : null}>{children}</Layout>;
};
export default LayoutDashboard;
