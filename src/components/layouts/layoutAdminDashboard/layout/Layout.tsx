"use client";
import React, { useState, useEffect, useRef } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Loading from "@/components/common/loading/Loading";
import saveCookie from "@/utils/common/saveCookie";
import ShowImg from "@/components/common/showImg/ShowImg";
import ThemeSwitch from "@/components/layouts/themeSwich/ThemeSwitch";
import Menus from "@/components/layouts/layoutDashboard/menus/Menus";
import LogoHeader from "@/components/layouts/layoutDashboard/logoHeader/LogoHeader";
import { showDateNow } from "@/utils/common/showDate";
import { updateUser } from "@/store/auth";

interface LayoutProps {
  children: React.ReactNode;
  user: { name: string; role?: string } | null;
  saveToken: { accessToken: string | null; refreshToken: string | null };
}

const Layout: React.FC<LayoutProps> = ({ children, user, saveToken }) => {

  useEffect(() => {
    if (saveToken?.accessToken && saveToken?.refreshToken) {
      saveCookie(saveToken?.accessToken, saveToken?.refreshToken);
    }
  }, []);

  const dispatch = useDispatch();

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

  const menu = [
    {
      title: "مقاله‌ها",
      icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
      path: "/",
      menues: [
        {
          title: "مقاله جدید",
          icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125",
          path: "/admin-dashboard/blog/new",
        },
        {
          title: "همه مقاله‌ها",
          icon: "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
          path: "/admin-dashboard/blog",
        },
        {
          title: "دسته بندی مقاله‌ها",
          icon: "M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z",
          path: "/admin-dashboard/blog-cats",
        },
        {
          title: "نظرات",
          icon: "M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
          path: "/admin-dashboard/blog/comments",
        },
      ],
    },
    {
      title: "دوره‌ها",
      icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z",
      path: "/",
      menues: [
        {
          title: "دوره جدید",
          icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125",
          path: "/admin-dashboard/courses/new",
        },
        {
          title: "همه دوره‌ها",
          icon: "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
          path: "/admin-dashboard/courses",
        },
        {
          title: "دسته بندی دوره‌ها",
          icon: "M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z",
          path: "/admin-dashboard/course-cats",
        },
      ],
    },
    {
      title: "ویدیوها",
      icon: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z",
      path: "/",
      menues: [
        {
          title: "ویدیو جدید",
          icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125",
          path: "/admin-dashboard/tvs/new",
        },
        {
          title: "همه ویدیوها",
          icon: "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
          path: "/admin-dashboard/tvs",
        },
        {
          title: "دسته بندی ویدیوها",
          icon: "M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z",
          path: "/admin-dashboard/tv-cats",
        },
        {
          title: "نظرات",
          icon: "M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
          path: "/admin-dashboard/tvs/comments",
        },
      ],
    },
    {
      title: "محصولات",
      icon: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
      path: "/",
      menues: [
        {
          title: "همه محصولات",
          icon: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
          path: "/admin-dashboard/products",
        },
        {
          title: "همه دسته‌ها",
          icon: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122",
          path: "/admin-dashboard/product-cats",
        },
      ],
    },
    // {
    //   title: "خطاها",
    //   icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
    //   path: "/",
    //   menues: [
    //     {
    //       title: "نمایش خطاهای ثبت شده",
    //       icon: "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z",
    //       path: "/admin-dashboard/errors",
    //     },
    //   ],
    // },
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
                <div
                  className={`${
                    showProfileMenu ? "" : "hidden"
                  } fixed top-0 left-0 bottom-0 right-0 bg-black-50 z-99 `}
                ></div>
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
                            className={`list-none transition-all relative rounded-tr-3xl rounded-br-3xl mb-[30px] hover:cursor-pointer ${
                              true == item.path ? "bg-primary-100" : ""
                            } `}
                          >
                            <Menus
                              showSide={showSide}
                              title={item.title}
                              icon={item.icon}
                              menues={item.menues}
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
                      {`خوش آمدید ${user?.name ?? ""} ${
                        user?.role ? `(${user.role})` : ""
                      }`}
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
                      <div
                        className={`${
                          showProfileMenu ? "" : "hidden"
                        } fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-black-50 z-9999 `}
                      ></div>
                      <div className="h-full flex items-center z-99999">
                        {/* <ShowImg classes="rounded-full w-[32px] h-[32px]" width={40} height={40} bucketName={'avatars'} fileName={'default-avatar64.jpg'} />  */}
                        <i className="fa fa-caret-down mr-1"></i>
                      </div>
                      <div
                        className={`absolute top-[44px] left-[18px] w-[180px] bg-white-100 p-3 rounded-lg dark:bg-dark-50 shadow-sm border dark:border-cyan-900 z-9999 ${
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
