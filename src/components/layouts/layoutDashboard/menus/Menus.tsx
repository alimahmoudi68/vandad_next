'use client'
import React, { useState, useRef } from 'react';
import { useRouter  , usePathname} from 'next/navigation';


interface MenuItem {
    path: string;
    icon: string;
    title: string;
}

interface MenusProps {
    showSide: boolean;
    title: string;
    icon: string;
    menues: MenuItem[];
    hideSidebar: () => void;
}

const Menus: React.FC<MenusProps> = ({ showSide, title, icon, menues, hideSidebar }) => {


    const router = useRouter();
    const pathname = usePathname();
    
    const [ActiveMain, setActiveMain] = useState(false);
    const [heightMain, setHeightMain] = useState(0);


    const contentMain = useRef<HTMLDivElement>(null);

    const ShowContentMain = () => {
        setActiveMain(!ActiveMain);
        setHeightMain(ActiveMain ? 0 : contentMain.current ? contentMain.current.scrollHeight : 0);
    }

    
    return (
        <>
            <div className="flex items-center justify-between transition-all duration-150 group" onClick={() => ShowContentMain()}>
                <div className='h-[40px] flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 ml-1 min-w-[78px] stroke-gray-700 dark:stroke-white-100 group-hover:stroke-primary-100 dark:stroke-white-100 duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    <span className={`text-base text-start font-medium transition-opacity text-gray-700 dark:text-white-100 group-hover:text-primary-100 ${showSide ? 'block transition  duration-900 opacity-100 ' : 'pointer-events-none opacity-0 '}`}>
                        {title}
                    </span>
                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`ml-3 h-5 w-5 stroke-gray-700 dark:stroke-white-100 group-hover:stroke-primary-100 ${ActiveMain ? "rotate-180	" : "" } ${showSide ? 'block opacity-100 ' : 'pointer-events-none opacity-0 '}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span className={`w-fit text-[0.5rem] dark:bg-gray-500 border border-gray-700 rounded-md text-gray-700 dark:bg-dark-50  dark:text-white-100 absolute p-1 top-[-20px] left-[50%] -translate-x-2/4 transition-all duration-500 hidden ${showSide ? '' : 'group-hover:block'}`}>
                    {title}
                </span>
            </div>
            <div className='max-h-0 overflow-hidden transition-all duration-500 outline-0' ref={contentMain} style={{ maxHeight: `${heightMain}px` }}>
                <ul className={`ml-2 first:mt-5 last:mb-0 transition-all`}>
                    {
                        menues.map((item , index) => (
                            
                            <li onClick={()=>router.push(item.path)} className={`relative ${showSide ? "pr-5" : "pr-0" } transition-all duration-200 rounded-bl-md rounded-tl-md group h-[40px] w-full flex ${pathname == `${item.path}` ? 'bg-primary-100' : ''} items-center p-0 ${index == menues.length-1 ? 'mb-0':'mb-5'}`} key={index}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 ml-1 min-w-[78px] transition-opacity ${pathname == `${item.path}` ? "stroke-white-100" : "stroke-gray-700 group-hover:stroke-primary-100 dark:stroke-white-100" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <div className='flex' onClick={()=>hideSidebar()}>
                                        <span className={`text-[0.9rem] no-underline font-medium ${pathname == `${item.path}` ? 'text-white-100' : 'text-gray-700 visited:text-gray-700 dark:text-white-100 dark:visited:text-white-100 active:text-gray-700 group-hover:text-primary-100'} transition-opacity ${showSide ? 'block  transition  duration-900 opacity-100 ' : 'pointer-events-none opacity-0'} `}>
                                            {item.title}
                                        </span>
                                </div>
                                <span className={`w-fit text-[0.5rem] dark:bg-gray-500 border border-gray-700 rounded-md text-gray-700 dark:bg-dark-50 dark:text-white-100 absolute p-1 top-[-20px] left-[50%] -translate-x-2/4 transition  hidden ${showSide ? '' : 'group-hover:block'}`}>
                                    {item.title}
                                </span>
                            </li>

                        ))

                    }

                </ul>
            </div>
            {
                !showSide ?
                (
                    <div className='w-full h-[1px] bg-gray-200 mt-[10px]'></div>
                )
                :
                null
            }
        </>
    )
}
export default Menus;