'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Menus = ({ title, items , closeSidebar }) => {


    const [ActiveMain, setActiveMain] = useState(false);
    const [heightMain, setHeightMain] = useState(0);


    const contentMain = useRef(null);


    const ShowContentMain = () => {
        setActiveMain(!ActiveMain);
        setHeightMain(ActiveMain ? 0 : contentMain.current.scrollHeight);
    }

    return (
        <>
            <div className="flex items-center justify-between text-gray-800 dark:text-white-100 hover:cursor-pointer hover:text-gray-600 dark:hover:text-white-50 transition-all duration-150" onClick={() => ShowContentMain()}>
                <span className='no-underline font-medium  visited:text-gray-800 dark:visited:text-white-100 active:text-gray-50 dark:active:text-white-100'>{title}</span>
                {
                    ActiveMain ?
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                          </svg>
                        )
                        :
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        )
                }
            </div>
            <div className='bg-white-100 dark:bg-dark-200 max-h-0 overflow-hidden transition-all duration-500 pr-8' ref={contentMain} style={{ maxHeight: `${heightMain}px` }}>
                <ul className='pr-0 first:mt-5 last:mb-0 pl-5'>
                    {
                        items?.length > 0 && items.map((item, index) => (

                            <li className={`p-0 ${index == items.length-1 ? 'mb-0':'mb-5'}`} key={index} onClick={()=>closeSidebar()}>
                                <div className='flex'>
                                    <Link href={item.path} className='no-underline font-medium text-gray-800 dark:text-white-100 visited:text-gray-800 dark:visited:text-white-100 active:text-gray-800 active:text-white-100 hover:text-gray-700 dark:hover:text-white-50'>
                                        {item.title}
                                    </Link>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default Menus;