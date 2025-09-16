"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Loading from "@/components/common/loading/Loading";
import saveCookie from "@/utils/common/saveCookie";
import ShowImg from '@/components/common/showImg/ShowImg';
import ThemeSwitch from "@/components/layouts/themeSwich/ThemeSwitch";
import Menus from "@/components/layouts/layoutDashboard/menus/Menus";
import LogoHeader from "@/components/layouts/layoutDashboard/logoHeader/LogoHeader";
import { showDateNow } from "@/utils/common/showDate";
import { updateUser } from "@/store/auth";
import { IUser } from "@/types/user";

interface LayoutProps {
  children: React.ReactNode;
  user: IUser;
  saveToken: { accessToken: string | null; refreshToken: string | null };
}

const Layout: React.FC<LayoutProps> = ({ children, user, saveToken }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (saveToken?.accessToken && saveToken?.refreshToken) {
      saveCookie(saveToken?.accessToken, saveToken?.refreshToken);
    }
  }, []);

  useEffect(() => {
    dispatch(updateUser(user));
  }, [dispatch, user]);

  const router = useRouter();

  const sidebar = useRef<HTMLDivElement>(null);
  const profileMenu = useRef<HTMLDivElement>(null);
  const btnProfileMenu = useRef<HTMLDivElement>(null);

  const [modalSidebarActive, setModalSidebarActive] = useState(false);
  const [showSide, setShowSide] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    setMenus(menu);

    window.addEventListener("resize", resizeHaandler);

    if (!isEmpty(profileMenu.current)) {
      if (profileMenu.current !== undefined) {
        document.addEventListener("mousedown", closeProfileMenu);
      }
    }

    document.addEventListener("mousedown", closeProfileMenu);
    return () => {
      document.removeEventListener("mousedown", closeProfileMenu);
    };
  }, []);


  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>


  const menu = [
    {
      title: "اطلاعات کاربری",
      icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
      link: "/dashboard/profile",
    },
    {
      title: "سفارش‌ها",
      icon: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
      link: "/dashboard/orders",
    },
  ];



  const resizeHaandler = () => {
    if (window.innerWidth < 768) {
      setModalSidebarActive(false);
      setShowSide(true);
    }
  };

  const showSidebarHandler = () => {
    if (showSide) {
      setShowSide(false);
    } else {
      setShowSide(true);
    }
  };

  const toggleSidebarMobileHandler = () => {
    setModalSidebarActive(true);
  };

  const hideSidebarMobileHandler = () => {
    setModalSidebarActive(false);
  };

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

  const logoutHandler = async () => {
    let response = await fetch("/api/remove-cookie", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <>
      <div className={`w-full grow`}>
        {
          // loadingAuth || !user ?
          false ? (
            <div className="w-screen h-screen flex items-center justify-center">
              <Loading classes="" />
            </div>
          ) : (
            <>
              <div
                className={`w-full h-full overflow-hidden fixed left-0 top-0 z-100 bg-loadingDark-100 ${
                  modalSidebarActive ? "block" : "hidden"
                } `}
                onClick={hideSidebarMobileHandler}
              ></div>
              <div
                ref={sidebar}
                className={`h-full flex flex-col bg-white-100 dark:bg-cardDark-100 z-1000 transition-all fixed t-0 md:mr-0 ${
                  modalSidebarActive ? "mr-0" : "-mr-[100%]"
                } ${showSide ? "w-[260px]" : "w-[78px]"}`}
              >
                <div className="w-full h-[60px] flex justify-center md:justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`hidden h-8 min-w-[78px] mr-1 stroke-gray-700 dark:stroke-white-100 transition-all md:block hover:cursor-pointer ${
                      showSide ? "" : "rotate-180"
                    } `}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    onClick={() => showSidebarHandler()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <LogoHeader path={"/"} />
                </div>
                <ul
                  className={`sidebar-menu-dashboard w-full pt-[30px] grow pb-[150px] h-[700px] ${
                    showSide ? "overflow-x-hidden" : "overflow-x-visible "
                  }`}
                >
                  {menus?.map((item, index) => {
                    {
                      return (
                        <React.Fragment key={index}>
                          <li
                            key={index}
                            className={`list-none transition-all relative rounded-tr-3xl rounded-br-3xl mb-[16px] hover:cursor-pointer ${
                              true == item.path ? "bg-primary-100" : ""
                            } `}
                          >
                            <Menus
                              showSide={showSide}
                              title={item.title}
                              icon={item.icon}
                              link={item.link}
                              hideSidebar={hideSidebarMobileHandler}
                            />
                          </li>
                        </React.Fragment>
                      );
                    }
                  })}
                </ul>
              </div>
              <div
                className={`w-full pl-0 flex flex-col transition-all relative  ${
                  showSide
                    ? "md:mr-[260px] md:w-full-260 "
                    : "md:mr-[78px] md:w-full-78"
                } `}
              >
                <div
                  className="h-[60px] w-full z-999 flex items-center px-[10px] py-1 justify-between sticky top-0 transition-all bg-white-30 dark:bg-cardDark-100
               backdrop-blur-lg"
                >
                  <div className="flex items-center justify-center">
                    <div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 stroke-slate-700 dark:stroke-white-100 block md:hidden hover:cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          onClick={() => toggleSidebarMobileHandler()}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-start text-[0.8rem] md:text-[1rem] font-semibold hover:cursor-pointer hover:opacity-80 mx-2">
                      {`خوش آمدید ${user?.firstName ?? "" }`}
                    </div>
                    <div className="w-[1px] self-stretch mx-3 bg-gray-800"></div>
                    <div
                      className="flex items-center justify-start text-[0.8rem] md:text-[1rem] font-semibold hover:cursor-pointer hover:opacity-80 mx-2"
                      suppressHydrationWarning
                    >
                      {`امروز: ${showDateNow()}`}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ThemeSwitch />
                    <div
                      ref={btnProfileMenu}
                      className="flex items-center justify-center text-color-state-600 relative hover:cursor-pointer z-9999"
                      onClick={() => showProfileMenuHandler()}
                    >

                      <div className="h-full flex items-center z-99999">
                        <div className="rounded-full w-[40px] h-[40px]">
                        {
                          user.avatar? 
                          (
                            <ShowImg
                            classes="w-full h-full rounded-full"
                            width={40}
                            height={40}
                            fileName={user?.avatar?.location}
                            bucketName={user?.avatar.bucket}
                            fill={true}
                            /> 
                          )
                          :
                          (
                            <Image
                            className="rounded-full"
                            alt="user profile"
                            src={'/images/default-avatar.webp'}
                            width={40}
                            height={40}
                            />
                          )
                        }
                        </div>
                        <i className="fa fa-caret-down mr-1"></i>
                      </div>
                      <div
                        className={`absolute top-[44px] left-[18px] w-[180px] bg-white-100 p-3 rounded-lg dark:bg-dark-50 shadow-sm border dark:border-cyan-900 z-[100] ${
                          showProfileMenu ? "block animate-fade-in" : "hidden"
                        } `}
                        ref={profileMenu}
                      >
                        <ul>
                          <li
                            onClick={logoutHandler}
                            className="flex items-center list-none text-sm font-normal px-3 py-2 w-full hover:cursor-pointer hover:bg-backgroundInput-100 dark:hover:bg-dark-100 rounded-lg"
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
                  </div>
                </div>
                <main className="py-5 p-3">{children}</main>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};
export default Layout;
