import type { Metadata } from "next";
import { redirect } from "next/navigation";
import getUser from "@/utils/common/getUser"

export const metadata: Metadata = {
  title: "ورود/ثبت نام",
  description: "ورود/ثبت نام",
};

const LayoutAuth = async({ children } : Readonly<{
    children: React.ReactNode;
  }>) => {

  let user = await getUser();

  if(user){
    redirect('/');
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <main className={`grow`}>{children}</main>
    </div>
  );
};

export default LayoutAuth;
