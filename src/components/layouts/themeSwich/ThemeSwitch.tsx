'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const changeThemeHandler = () => {
        if (theme === 'system') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    return (
        <div className={`relative flex items-center border justify-center md:w-[40px] md:h-[40px] w-[32px] h-[32px] rounded-full ml-2 ${theme == 'dark' ? 'bg-[#41414194]' : 'bg-bg-100'} hover:cursor-pointer md:hover:bg-dark-50 group dark:bg-dark-50 md:dark:hover:bg-backgroundInput-100`} onClick={() => changeThemeHandler()}>
            {
                theme === 'light' ?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )
                    :
                    (

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )
            }
            <div className={`hidden md:left-[-10px] left-[20px] top-[45px] absolute md:group-hover:block rounded-lg ${theme == 'dark' ? 'bg-cardDark-100' : 'bg-bg-100'} text-xs w-16 text-center`}>
                {
                    theme === 'light' ?
                        (
                            <span className='text-slate-500'>
                                حالت تاریک
                            </span>
                        )
                        :
                        (
                            <span className='dark:text-white-500'>
                                حالت روشن
                            </span>
                        )
                }
            </div>
        </div>
    )
}

export default ThemeSwitch



