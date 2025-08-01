"use client";
import Link from 'next/link';

import ThemeSwitch from '@/components/layouts/themeSwich/ThemeSwitch';

import LoginForm from "@/components/pages/auth/loginForm/LoginForm";

export default function Login() {
  return (

    <div className="w-full h-full flex flex-row">

      <div className="w-full h-full md:w-[50%] flex flex-col items-center justify-center relative">
        <div className="container bg-transparent mx-auto flex justify-end items-center py-4 absolute top-[10px] left-[10px]">
          <ThemeSwitch />
        </div>
        <LoginForm />
        <Link href="/" className='mt-3 hover:underline'>برگشت به صفحه اصلی</Link>
      </div>
      <div className="w-full md:w-[50%] hidden md:block bg-[url('/images/login_image.jpg')] bg-cover	bg-no-repeat">
      </div>
    
    </div>

  );
}
