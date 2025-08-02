import { redirect } from "next/navigation";

import Layout from "@/components/layouts/layoutAdminDashboard/layout/Layout";
import getUser from "@/utils/common/getUser";

import { ReactNode } from "react";

const LayoutDashboard = async ({ children }: { children: ReactNode }) => {
  const getUserInfo = await getUser();

  if (!getUserInfo) {
    //redirect("/auth/login");
  }

  const user = {
    id: getUserInfo?.user._id,
    name: getUserInfo?.user.name,
    type: getUserInfo?.user.type,
    avatar: getUserInfo?.user.avatar,
    role: getUserInfo?.user?.["role.title"],
    Permissions: getUserInfo?.user.permissions,
  };

  // if (getUserInfo?.accessToken) {
  //   redirect(`/auth/refresh`);
  // }

  return (
    <Layout
      user={getUserInfo ? user : null}
      saveToken={{
        accessToken: getUserInfo?.accessToken || null,
        refreshToken: getUserInfo?.refreshToken || null,
      }}
    >
      {children}
    </Layout>
  );
};
export default LayoutDashboard;
