'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


interface MenusProps {
    showSide: boolean;
    title: string;
    icon: string;
    link: string;
    hideSidebar: () => void;
}

const Menus: React.FC<MenusProps> = ({ showSide, title, icon, link, hideSidebar }) => {
    const pathname = usePathname();
    const isActive = pathname === link;

    return (
        <>
            <Link href={link ?? "#"} className={`flex items-center justify-between transition-all duration-150 group ${isActive ? 'bg-primary-100' : ''}`}>
                <div className='h-[40px] flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 ml-1 min-w-[78px] ${isActive ? 'stroke-white-100' : 'stroke-gray-700 dark:stroke-white-100 group-hover:stroke-primary-100 dark:stroke-white-100'} duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    <span className={`text-base text-start font-medium transition-opacity ${isActive ? 'text-white-100' : 'text-gray-700 dark:text-white-100 group-hover:text-primary-100'} ${showSide ? 'block transition  duration-900 opacity-100 ' : 'pointer-events-none opacity-0 '}`}>
                        {title}
                    </span>
                </div>
                
                <span className={`w-fit text-[0.5rem] dark:bg-gray-500 border border-gray-700 rounded-md text-gray-700 dark:bg-dark-50  dark:text-white-100 absolute p-1 top-[-20px] left-[50%] -translate-x-2/4 transition-all duration-500 hidden ${showSide ? '' : 'group-hover:block'}`}>
                    {title}
                </span>
            </Link>
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