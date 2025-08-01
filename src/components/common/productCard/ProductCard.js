import {useState , useEffect} from "react";
import ShowImg from "@/components/common/showImg/ShowImg";
import Link from "next/link";
import { useTheme } from "next-themes";


export default function ProductCard({classes , img , title , price}){
  
  return(
    <div className={`${classes} p-3 border dark:border-dark-25 bg-white-100 dark:bg-dark-25 flex flex-col items-start rounded-md`}>
      <ShowImg alt="alt"  width={500} height={500} src={img} className="w-full h-auto mb-2 rounded-md"/>
      <span className="text-primartText-100 text-[1rem] font-light mb-2">{title}</span>
      <div className="w-full flex flex-col items-end ">
        <span className="text-primaryText-100 text-[0.9rem] font-light text-right" dir="rtl">
          {Number(price).toLocaleString('fa-IR')}
          <span className="mr-2 text-[0.6rem]">تومان</span>
        </span>
        <span className="text-primaryText-100 text-[0.9rem] font-light text-right" dir="rtl">
          {Number(price).toLocaleString('fa-IR')}
          <span className="mr-2 text-[0.6rem]">تومان</span>
        </span>
      </div>
    </div>
  )
}