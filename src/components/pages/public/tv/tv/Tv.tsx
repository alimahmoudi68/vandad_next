"use client";
import React from "react";
import Link from "next/link";

import { ITv , ITvCat } from "@/types/tv";
import TvCard from "@/components/common/tvCard/TvCard";

export const metadata = {
  title: 'ونداد | مقالات',
  description: '',
}

type TvPageProps = {
  tvs: ITv[];
  tvCats: ITvCat[];
};


export default function TvPage({ tvs, tvCats }: TvPageProps) {

  return (
    <>
      <div className="container mx-auto px-3 md:px-0 pt-[10px] md:pt-[120px] flex flex-wrap gap-x-[20px]">
        <div className='w-full lg:w-[calc(75%-10px)] flex flex-wrap gap-[20px] xl:gap-[30px] 2xl:gap-[15px] order-1 lg:order-2'>
          {
            tvs.map((tv , index)=>(
              <TvCard
                key={index}
                classes="w-full sm:w-[calc(50%-10px)] xl:w-[calc(33.33%-10px)] 2xl:w-[calc(25%-20px)]"
                title={tv.title}
                image={tv.image}
                slug={tv.slug}
                categories={tv.categories}
              />
            ))
          }
        </div>
        <div className='w-full h-fit lg:w-[calc(25%-10px)] max-w-[200px] order-2 lg:order-1 bg-white-100 rounded-[10px] p-[20px]'>
          <ul className="flex flex-col gap-[10px]">
            {
              tvCats.map((cat , index)=>(
              <li key={index}>
                <Link href={`/tvs/categories/${cat.slug}`} className='hover:text-primary-100 duration-200'>
                  {cat.title}
                </Link>
              </li>
              ))
            }
          </ul>
        </div>

      </div>
    </>
  );

}
