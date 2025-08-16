"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import HeaderLink from "@/components/layouts/headerLink/HeaderLinks";
import FoterLink from "@/components/layouts/footerLink/FooterLinks";

import ThemeSwitch from "@/components/layouts/themeSwich/ThemeSwitch";
import Menus from "@/components/layouts/menus/Menus";
import ShowImg from "@/components/common/showImg/ShowImg";
import LogoHeader from "@/components/layouts/logoHeader/LogoHeader";
import saveCookie from "@/utils/common/saveCookie";
import { updateUser } from "@/store/auth";

interface LayoutProps {
  children: React.ReactNode;
  user: { name: string; role?: string; avatar: string } | null;
  saveToken: { accessToken: string | null; refreshToken: string | null };
}

const LayoutPublic: React.FC<LayoutProps> = ({ children, user, saveToken }) => {
  useEffect(() => {
    if (saveToken?.accessToken && saveToken?.refreshToken) {
      saveCookie(saveToken?.accessToken, saveToken?.refreshToken);
    }
  }, []);

  const dispatch = useDispatch();
  dispatch(updateUser(user));

  const profileMenu = useRef<HTMLDivElement | null>(null);
  const btnProfileMenu = useRef<HTMLDivElement | null>(null);
  const headerSide = useRef<HTMLDivElement | null>(null);
  const headerSideModal = useRef<HTMLDivElement | null>(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", closeProfileMenu);
    return () => {
      document.removeEventListener("mousedown", closeProfileMenu);
    };
  }, []);

  const showProfileMenuHandler = () => {
    if (showProfileMenu) {
      setShowProfileMenu(false);
    } else {
      setShowProfileMenu(true);
    }
  };

  const closeProfileMenu = (e: MouseEvent) => {
    if (!isEmpty(profileMenu.current)) {
      if (
        profileMenu.current &&
        btnProfileMenu.current &&
        !profileMenu.current.contains(e.target as Node) &&
        !btnProfileMenu.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
  };

  const showHeaderSideHandler = () => {
    if (headerSideModal.current && headerSide.current) {
      headerSideModal.current.style.display = "block";

      setTimeout(() => {
        headerSide.current!.classList.add("translate-x-[0%]");
        headerSide.current!.classList.remove("translate-x-full");
      }, 100);
    }
  };

  const CheckHideHeaderSideHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === headerSideModal.current) {
      hideHeaderSideHandler();
    }
  };

  const hideHeaderSideHandler = (_e?: React.MouseEvent<HTMLElement>) => {
    if (headerSide.current && headerSideModal.current) {
      headerSide.current.classList.remove("translate-x-[0%]");
      headerSide.current.classList.add("translate-x-full");

      setTimeout(() => {
        headerSideModal.current!.style.display = "none";
      }, 300);
    }
  };

  const logoutHandler = async () => {
    saveCookie("", "");
    router.refresh();
  };

  return (
    <>
      <header
        className={`hidden fixed z-30 h-full w-full overflow-auto bg-slate-900 bg-opacity-50`}
        ref={headerSideModal}
        onClick={(e) => CheckHideHeaderSideHandler(e)}
      >
        <nav
          className="flex flex-col items-center justify-start absolute top-0 translate-x-full bg-white-100 dark:bg-dark-50 w-[250px] h-screen z-40 pt-5 pr-1 pb-5  transition-transform duration-300 overflow-auto md:hidden"
          ref={headerSide}
        >
          <div className="w-[150px] md:w-[200px] flex justify-center ">
            <LogoHeader path={"/"} />
          </div>
          <ul className="w-full flex flex-col list-none  p-3">
            <li
              className="pb-5 text-right"
              onClick={() => hideHeaderSideHandler()}
            >
              <Link
                href="/"
                className="no-underline font-semibold text-gray-800 dark:text-white-100 visited:text-gray-800 dark:visited:text-white-100 active:text-gray-800 dark:active:text-white-100 hover:text-gray-600 dark:hover:text-white-50"
              >
                صفحه اصلی
              </Link>
            </li>
            <li
              className="pb-5 text-right"
              onClick={() => hideHeaderSideHandler()}
            >
              <Link
                href="#"
                className="no-underline font-semibold text-gray-800 dark:text-white-100 visited:text-gray-800 dark:visited:text-white-100 active:text-gray-800 dark:active:text-white-100 hover:text-gray-600 dark:hover:text-white-50"
              >
                وبلاگ
              </Link>
            </li>
            <li
              className="pb-5 text-right"
              onClick={() => hideHeaderSideHandler()}
            >
              <Link
                href="#"
                className="no-underline font-semibold text-gray-800 dark:text-white-100 visited:text-gray-800 dark:visited:text-white-100 active:text-gray-800 dark:active:text-white-100 hover:text-gray-600 dark:hover:text-white-50"
              >
                درباره ما
              </Link>
            </li>
            <li
              className="pb-5 text-right"
              onClick={() => hideHeaderSideHandler()}
            >
              <Link
                href="#"
                className="no-underline font-semibold text-gray-800 dark:text-white-100 visited:text-gray-800 dark:visited:text-white-100 active:text-gray-800 dark:active:text-white-100 hover:text-gray-600 dark:hover:text-white-50"
              >
                ارتباط با ما
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <header
        className={`flex w-full transition-all duration-300 z-20 md:fixed md:top-3 right-0`}
      >
        <div className="container mx-auto flex bg-white-100 dark:bg-[#494949bc] py-4 md:p-6 px-1 shadow-header-light rounded-lg">
          <div className="flex items-center justify-start flex-grow">
            <div className="flex items-center mx-2 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-6 md:w-6 hover:cursor-pointer hover:opacity-60 stroke-gray-700 dark:stroke-white-100"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                onClick={() => showHeaderSideHandler()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <div className="h-full flex justify-center ml-[16px]">
              <LogoHeader path={"/"} />
            </div>

            <nav className="hidden md:flex items-center">
              <ul className="flex p-0 m-0 list-none h-[35px]">
                <li className="flex items-center">
                  <HeaderLink title="خانه" link="#" />
                </li>
                <li className="flex items-center">
                  <HeaderLink title="بچگانه" link="#" />
                </li>
                <li className="flex items-center">
                  <HeaderLink title="بچگانه" link="#" />
                </li>
                <li className="flex items-center">
                  <HeaderLink title="بچگانه" link="#" />
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-end items-center">
            <ThemeSwitch />
            {!user ? (
              <>
                <Link
                  href={"/auth/login"}
                  className="px-[10px] py-[5px] md:px-[30px] md:py-[5px] xxxsm:px-2 text-white-100 bg-primary-100 border border-primary-100 hover:bg-white-100 hover:text-primary-100 hover:opacity-90 rounded-md duration-300"
                >
                  <svg
                    xmlns="http://w5w.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 inline ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  ورود
                </Link>
              </>
            ) : (
              <div
                ref={btnProfileMenu}
                className="flex items-center justify-center text-color-state-600 relative hover:cursor-pointer z-[9999]"
                onClick={() => showProfileMenuHandler()}
              >
                <div
                  className={`${
                    showProfileMenu ? "" : "hidden"
                  } fixed top-0 left-0 bottom-0 right-0 bg-black-50 z-[99] `}
                ></div>
                <div className="h-full flex items-center">
                  {/* <ShowImg
                    classes="rounded-full w-[32px] h-[32px]"
                    width={40}
                    height={40}
                    fileName={user?.avatar}
                    bucketName={"avatar"}
                  /> */}
                  <Image
                    alt="user profile"
                    src="/images/default-avatar.webp"
                    className="rounded-full w-[32px] h-[32px]"
                    width={40}
                    height={40}
                  />
                  <i className="fa fa-caret-down mr-1"></i>
                </div>
                <div
                  className={`absolute top-[44px] left-[18px] w-[180px] bg-white-100 p-2 rounded-lg dark:bg-bgDark-100 shadow-sm border dark:border-[#494949bc] z-[9999] ${
                    showProfileMenu ? "block animate-fade-in" : "hidden"
                  } `}
                  ref={profileMenu}
                >
                  <ul>
                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center list-none text-sm font-normal px-3 py-2 w-full hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-[#494949bc] rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="mr-1">داشبورد کاربری من</span>
                      </Link>
                    </li>
                    <li
                      onClick={logoutHandler}
                      className="flex items-center list-none text-sm font-normal px-3 py-2 w-full hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-[#494949bc] rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="mr-1">خروج</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <main
        className={`container mx-auto flex-grow px-3 md:px-0 pt-[10px] md:pt-[130px] pb-6`}
        suppressHydrationWarning
      >
        {children}
      </main>
      <footer className="w-full text-sm font-normal leading-6 pb-20 md:pb-5 px-3 md:px-0 text-center text-white-100">
        <div className="container mx-auto bg-[#1c1d22] shadow-footer dark:shadow-footer-dark rounded-lg">
          <div className="flex flex-wrap gap-y-7 justify-around md:justify-between py-6 px-3">
            <div className="w-full md:w-[48%]">
              <span className="block font-bold text-[1.3rem] mb-2">
                درباره آموزشگاه لیوسا
              </span>
              <span className="text-start">
                آموزشگاه لیوسا یکی از پرتلاش‌ترین و بروزترین وبسایت های آموزشی
                دوره‌های آرایشگری و زیبایی در سطح ایران است که همیشه تلاش کرده
                تا بتواند جدیدترین و بروزترین دوره‌های آموزشی را در اختیار
                علاقه‌مندان ایرانی قرار دهد
              </span>
            </div>
            <div className="w-full text-center md:w-[30%]">
              <span className="block font-bold text-[1.3rem] mb-2">
                راه های ارتباطی
              </span>
              <div className="flex items-center gap-x-2 mb-2">
                <span>شماره تماس:</span>
                <a
                  href="tel:09158008898"
                  className="block hover:opacity-70 transition-all duration-150"
                >
                  09158008898
                </a>
              </div>
              <div className="flex items-center gap-x-2 mb-3">
                <span>آدرس:</span>
                <Link
                  href="tel:09158008898"
                  className="block hover:opacity-70 transition-all duration-150"
                >
                  بین سیدرضی ۱۹ و ۲۱، آموزشگاه لیوسا
                </Link>
              </div>
              <div className="flex gap-x-4">
                <a
                  href="https://instagram.com/<?php echo get_option('my_insta') ?>"
                  className="group hover:translate-y-[-4px] duration-[500ms]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    stroke="#fff"
                    className="w-[20] h-[20px] fill-white-100 group-hover:fill-primary-100"
                  >
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                  </svg>
                </a>
                <a
                  href="https://t.me/<?php echo get_option('my_telegram') ?>"
                  className="group hover:translate-y-[-4px] duration-[500ms]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    stroke="#fff"
                    className="w-[20] h-[20px] fill-white-100 group-hover:fill-primary-100"
                  >
                    <path d="M 44.376953 5.9863281 C 43.889905 6.0076957 43.415817 6.1432497 42.988281 6.3144531 C 42.565113 6.4845113 40.128883 7.5243408 36.53125 9.0625 C 32.933617 10.600659 28.256963 12.603668 23.621094 14.589844 C 14.349356 18.562196 5.2382813 22.470703 5.2382812 22.470703 L 5.3046875 22.445312 C 5.3046875 22.445312 4.7547875 22.629122 4.1972656 23.017578 C 3.9185047 23.211806 3.6186028 23.462555 3.3730469 23.828125 C 3.127491 24.193695 2.9479735 24.711788 3.015625 25.259766 C 3.2532479 27.184511 5.2480469 27.730469 5.2480469 27.730469 L 5.2558594 27.734375 L 14.158203 30.78125 C 14.385177 31.538434 16.858319 39.792923 17.402344 41.541016 C 17.702797 42.507484 17.984013 43.064995 18.277344 43.445312 C 18.424133 43.635633 18.577962 43.782915 18.748047 43.890625 C 18.815627 43.933415 18.8867 43.965525 18.957031 43.994141 C 18.958531 43.994806 18.959437 43.99348 18.960938 43.994141 C 18.969579 43.997952 18.977708 43.998295 18.986328 44.001953 L 18.962891 43.996094 C 18.979231 44.002694 18.995359 44.013801 19.011719 44.019531 C 19.043456 44.030655 19.062905 44.030268 19.103516 44.039062 C 20.123059 44.395042 20.966797 43.734375 20.966797 43.734375 L 21.001953 43.707031 L 26.470703 38.634766 L 35.345703 45.554688 L 35.457031 45.605469 C 37.010484 46.295216 38.415349 45.910403 39.193359 45.277344 C 39.97137 44.644284 40.277344 43.828125 40.277344 43.828125 L 40.310547 43.742188 L 46.832031 9.7519531 C 46.998903 8.9915162 47.022612 8.334202 46.865234 7.7402344 C 46.707857 7.1462668 46.325492 6.6299361 45.845703 6.34375 C 45.365914 6.0575639 44.864001 5.9649605 44.376953 5.9863281 z M 44.429688 8.0195312 C 44.627491 8.0103707 44.774102 8.032983 44.820312 8.0605469 C 44.866523 8.0881109 44.887272 8.0844829 44.931641 8.2519531 C 44.976011 8.419423 45.000036 8.7721605 44.878906 9.3242188 L 44.875 9.3359375 L 38.390625 43.128906 C 38.375275 43.162926 38.240151 43.475531 37.931641 43.726562 C 37.616914 43.982653 37.266874 44.182554 36.337891 43.792969 L 26.632812 36.224609 L 26.359375 36.009766 L 26.353516 36.015625 L 23.451172 33.837891 L 39.761719 14.648438 A 1.0001 1.0001 0 0 0 38.974609 13 A 1.0001 1.0001 0 0 0 38.445312 13.167969 L 14.84375 28.902344 L 5.9277344 25.849609 C 5.9277344 25.849609 5.0423771 25.356927 5 25.013672 C 4.99765 24.994652 4.9871961 25.011869 5.0332031 24.943359 C 5.0792101 24.874869 5.1948546 24.759225 5.3398438 24.658203 C 5.6298218 24.456159 5.9609375 24.333984 5.9609375 24.333984 L 5.9941406 24.322266 L 6.0273438 24.308594 C 6.0273438 24.308594 15.138894 20.399882 24.410156 16.427734 C 29.045787 14.44166 33.721617 12.440122 37.318359 10.902344 C 40.914175 9.3649615 43.512419 8.2583658 43.732422 8.1699219 C 43.982886 8.0696253 44.231884 8.0286918 44.429688 8.0195312 z M 33.613281 18.792969 L 21.244141 33.345703 L 21.238281 33.351562 A 1.0001 1.0001 0 0 0 21.183594 33.423828 A 1.0001 1.0001 0 0 0 21.128906 33.507812 A 1.0001 1.0001 0 0 0 20.998047 33.892578 A 1.0001 1.0001 0 0 0 20.998047 33.900391 L 19.386719 41.146484 C 19.35993 41.068197 19.341173 41.039555 19.3125 40.947266 L 19.3125 40.945312 C 18.800713 39.30085 16.467362 31.5161 16.144531 30.439453 L 33.613281 18.792969 z M 22.640625 35.730469 L 24.863281 37.398438 L 21.597656 40.425781 L 22.640625 35.730469 z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="py-2 bg-[#131417] px-3 flex flex-col gap-y-2 rounded-b-lg	">
            <small>
              کلیه حقوق این سایت متعلق به سایت آموزشگاه لیوسا می‌باشد.
            </small>
          </div>
        </div>
      </footer>
    </>
  );
};
export default LayoutPublic;
