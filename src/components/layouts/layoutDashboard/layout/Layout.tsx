'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';


import Loading from '@/components/common/loading/Loading';
// import ShowImg from '@/components/common/showImg/ShowImg';
import ThemeSwitch from '@/components/layouts/themeSwich/ThemeSwitch';
import Menus from '@/components/layouts/layoutDashboard/menus/Menus';
import LogoHeader from '@/components/layouts/layoutDashboard/logoHeader/LogoHeader';
import saveCookie from "@/utils/common/saveCookie";
import {showDateNow} from '@/utils/common/showDate';
import {updateUser} from '@/store/auth';


interface LayoutProps {
  children: React.ReactNode;
  user: { name: string; role?: string } | null;
  saveToken: { accessToken: string | null; refreshToken: string | null} ;
}

const Layout: React.FC<LayoutProps> = ({ children, user, saveToken }) => {

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
    if (saveToken.accessToken && saveToken.refreshToken) {
      saveCookie(saveToken.accessToken, saveToken.refreshToken);
    }
  }, [saveToken]); 


  useEffect(() => {

    setMenus(menu);

    window.addEventListener('resize', resizeHaandler);

    if (!isEmpty(profileMenu.current)) {
      if (profileMenu.current !== undefined) {
        document.addEventListener("mousedown", closeProfileMenu);
      }
    }

    document.addEventListener("mousedown", closeProfileMenu);
    return () => {
       document.removeEventListener("mousedown", closeProfileMenu);
    }

  }, [] );


  const menu = [
    {
      title: 'محصولات' ,
      icon: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
      path: '/',
      menues : [
        {
            title: 'افزودن ',
            icon : 'M12 4.5v15m7.5-7.5h-15',
            path: "/dashboard/products/new" ,
        },
        {
          title: 'همه محصولات',
          icon : 'M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99',
          path: "/dashboard/products" ,
        },
      ]
    },
    {
      title: 'دسته بندی‌ها' ,
      icon: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
      path: '/',
      menues : [
        {
            title: 'افزودن',
            icon : 'M12 4.5v15m7.5-7.5h-15',
            path: "/dashboard/categories/new" ,
        },
        {
          title: 'همه دسته‌ها',
          icon : 'M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99',
          path: "/dashboard/categories" ,
        },
      ]
    },
    {
      title: 'ویژگی‌ها' ,
      icon: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12",
      path: '/',
      menues : [
        {
            title: 'افزودن',
            icon : 'M12 4.5v15m7.5-7.5h-15',
            path: "/dashboard/attributes/new" ,
        },
        {
          title: 'همه ویژگی‌ها',
          icon : 'M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99',
          path: "/dashboard/attributes" ,
        },
        {
          title: 'مقادیر ویژگی‌ها',
          icon : 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
          path: "/dashboard/attributesMeta" ,
        },
      ]
    },
    {
      title: 'دسترسی‌ها' ,
      icon: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z",
      path: '/',
      menues : [
        {
            title: 'نقش‌ها',
            icon : 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z',
            path: "/dashboard/roles" ,
        },
        {
          title: 'دسترسی‌ها',
          icon : 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
          path: "/dashboard/permissions" ,
        },
      ]
    },
    {
      title: 'خطاها' ,
      icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
      path: '/',
      menues : [
        {
          title: 'نمایش خطاهای ثبت شده',
          icon : 'M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z',
          path: "/dashboard/errors" ,
        },
      ]
    },
  ]

  const resizeHaandler = () => {
    if (window.innerWidth < 768) {
      setModalSidebarActive(false);
      setShowSide(true);
    }
  }

  const showSidebarHandler = () => {
    if (showSide) {
      setShowSide(false);
    } else {
      setShowSide(true);
    }
  }

  const toggleSidebarMobileHandler = () => {
    setModalSidebarActive(true);
  }

  const hideSidebarMobileHandler = () => {
    setModalSidebarActive(false);
  }

  const showProfileMenuHandler = () => {
    if (showProfileMenu) {
      setShowProfileMenu(false);
    } else {
      setShowProfileMenu(true);
    }
  }


  const closeProfileMenu = (e: MouseEvent) => {
    if (!isEmpty(profileMenu.current)) {
      if (profileMenu.current && btnProfileMenu.current && !profileMenu.current.contains(e.target as Node) && !btnProfileMenu.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    }
  }

  const logoutHandler = async()=>{

    let response = await fetch('/api/remove-cookie' , {
        method : "POST"
    })

    if(response.ok){
      router.push('/');
    }
  }

  return (
    <>

    <div className={`w-full grow`}>
        {
        // loadingAuth || !user ?
        false ?
        (
          
          <div className="w-screen h-screen flex items-center justify-center">
            <Loading classes=""/>
          </div>
        )
        :
        (
          <>
            <div className={`w-full h-full overflow-hidden fixed left-0 top-0 z-100 bg-loadingDark-100 ${modalSidebarActive ? 'block' : 'hidden'} `} onClick={hideSidebarMobileHandler}>
            </div>
            <div ref={sidebar} className={`h-full flex flex-col bg-white-100 dark:bg-cardDark-100 z-1000 transition-all fixed t-0 md:mr-0 ${modalSidebarActive ? 'mr-0' : '-mr-[100%]'} ${showSide ? 'w-[260px]' : 'w-[78px]'}`}>
                <div className={`${showProfileMenu ? '' : 'hidden'} fixed top-0 left-0 bottom-0 right-0 bg-black-50 z-99 `}></div>
                <div className='w-full h-[60px] flex justify-center md:justify-start items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`hidden h-8 min-w-[78px] mr-1 stroke-gray-700 dark:stroke-white-100 transition-all md:block hover:cursor-pointer ${showSide ? '' : 'rotate-180'} `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={() => showSidebarHandler()}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <LogoHeader path={'/'}/>
                </div>
                <ul className={`sidebar-menu-dashboard w-full pt-[30px] grow pb-[150px] h-[700px] ${showSide ? 'overflow-x-hidden' : 'overflow-x-visible ' }`}>
                  {
                    menus?.map((item, index) => {
                      {
                        return (
                          <React.Fragment key={index}>
                            <li key={index} className={`list-none transition-all relative rounded-tr-3xl rounded-br-3xl mb-[30px] hover:cursor-pointer ${true == item.path ? 'bg-primary-100' : ''} `}>
                              <Menus showSide={showSide} title={item.title} icon={item.icon} menues={item.menues} hideSidebar={hideSidebarMobileHandler}/>
                            </li>
                          </React.Fragment>
                        )
                      }
                    })
                  }
                </ul>

           
            </div>
            <div className={`w-full pl-0 flex flex-col transition-all relative  ${showSide ? 'md:mr-[260px] md:w-full-260 ' : 'md:mr-[78px] md:w-full-78'} `}>
              <div className='h-[60px] w-full z-999 flex items-center px-[10px] py-1 justify-between sticky top-0 transition-all bg-white-30 dark:bg-cardDark-100
               backdrop-blur-lg'>
                <div className='flex items-center justify-center'>
                <div>
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 stroke-slate-700 dark:stroke-white-100 block md:hidden hover:cursor-pointer' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={() => toggleSidebarMobileHandler()}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  </div>
                  <div className='flex items-center justify-start text-[0.8rem] md:text-[1rem] font-semibold hover:cursor-pointer hover:opacity-80 mx-2'>
                    {`خوش آمدید ${user?.name ?? ''} ${user?.role ? `(${user.role})` : ''}`}
                  </div>
                  <div className='w-[1px] self-stretch mx-3 bg-gray-800'></div>
                  <div className='flex items-center justify-start text-[0.8rem] md:text-[1rem] font-semibold hover:cursor-pointer hover:opacity-80 mx-2' suppressHydrationWarning >
                    {`امروز: ${showDateNow()}`}
                  </div>
                </div>
                <div className='flex items-center'>
                  <ThemeSwitch/>
                  <div ref={btnProfileMenu} className="flex items-center justify-center text-color-state-600 relative hover:cursor-pointer z-9999" onClick={() => showProfileMenuHandler()}>
                    <div className={`${showProfileMenu ? '' : 'hidden'} fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-black-50 z-9999 `}></div>
                    <div className="h-full flex items-center z-99999">
                      <Image 
                      alt='user profile'
                      src='/images/default-avatar.webp' 
                      className="rounded-full w-[32px] h-[32px]"
                      width={40}
                      height={40}/>
                      {/* <ShowImg classes="rounded-full w-[32px] h-[32px]" width={40} height={40} bucketName={'avatars'} fileName={'default-avatar64.jpg'} />  */} 
                      <i className="fa fa-caret-down mr-1"></i>
                    </div>
                    <div
                      className={`absolute top-[44px] left-[18px] w-[180px] bg-white-100 p-3 rounded-lg dark:bg-dark-50 shadow-sm border dark:border-cyan-900 z-9999 ${
                        showProfileMenu ? "block animate-fade-in" : "hidden"
                      } `}
                      ref={profileMenu}>
                      <ul>
                        <li onClick={logoutHandler} className="flex items-center list-none text-sm font-normal px-3 py-2 w-full hover:cursor-pointer hover:bg-backgroundInput-100 dark:hover:bg-dark-100 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="mr-1">خروج</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                 
                </div>
              </div >
              <main className='py-5 p-3'>
              {children}
              </main>
            </div> 
          </>

        )
      }
      
    </div>  
                
      
    </>


  )
}
export default Layout;

