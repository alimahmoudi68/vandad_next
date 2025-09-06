import {useState , useEffect} from "react";
import ShowImg from "@/components/common/showImg/ShowImg";
import Link from "next/link";


interface ProductCardProps{
  classes: string  , 
  slug: string ,  
  img: {
    bucket: string,
    location: string
  }, 
  title: string,
  price: number 
}

export default function ProductCard({classes , slug , img , title , price} : ProductCardProps){

  console.log(slug);
  
  return(
    <div className={`${classes} border dark:border-cardDark-100 dark:border-dark-25 bg-white-100 dark:bg-cardDark-100 flex flex-col items-start rounded-md`}>
      <Link href={`/products/${slug}`}>
        <ShowImg alt={title} width={500} height={500} bucketName={img?.bucket} fileName={img?.location} classes="w-full h-auto mb-2 rounded-md"/>
      </Link>
      <div className="w-full p-3">
        <Link href={`/products/${slug}`}>
          <h2 className="text-primartText-100 text-[1rem] font-light mb-2">{title}</h2>
        </Link>
        <div className="w-full flex flex-col items-end ">
          <span className="text-primaryText-100 text-[0.9rem] font-light text-right" dir="rtl">
            {Number(price).toLocaleString('fa-IR')}
            <span className="mr-1 text-[0.6rem]">تومان</span>
          </span>
        </div>
      </div>
    </div>
  )
}