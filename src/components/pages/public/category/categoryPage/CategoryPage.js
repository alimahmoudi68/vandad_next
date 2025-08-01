"use client";
import React , {useState} from "react";

import ProductCard from '@/components/common/productCard/ProductCard';
import Filter from '../filter/Filter';


const products = [
    {
        id:1,
        title: 'لباس بچگانه کد 748',
        price: 456000 ,
        image: 'https://dkstatics-public.digikala.com/digikala-products/591a49a9364fd972343e949ae64365094c9e9b09_1622741392.jpg?x-oss-process=image/resize,w_1600/quality,q_80'
    },
    {
        id:2,
        title: 'کاپشن بچگانه راه راه کد 789',
        price: 456000,
        image: 'https://dkstatics-public.digikala.com/digikala-products/591a49a9364fd972343e949ae64365094c9e9b09_1622741392.jpg?x-oss-process=image/resize,w_1600/quality,q_80'
    },
    {
        id:3,
        title: 'پیراهن مردانه کد 125',
        price: 456000,
        image: 'https://dkstatics-public.digikala.com/digikala-products/591a49a9364fd972343e949ae64365094c9e9b09_1622741392.jpg?x-oss-process=image/resize,w_1600/quality,q_80'
    },
    {
        id:4,
        title: 'پیراهن مردانه کد 125',
        price: 456000,
        image: 'https://dkstatics-public.digikala.com/digikala-products/591a49a9364fd972343e949ae64365094c9e9b09_1622741392.jpg?x-oss-process=image/resize,w_1600/quality,q_80'
    },
    {
        id:5,
        title: 'پیراهن مردانه کد 125',
        price: 456000,
        image: 'https://dkstatics-public.digikala.com/digikala-products/591a49a9364fd972343e949ae64365094c9e9b09_1622741392.jpg?x-oss-process=image/resize,w_1600/quality,q_80'
    }
];

const allFilters = [
    {
        title: "برند",
        name: "brand",
        options: [
            {
                title: "برند 1",
                value: "brand 1"
            },
            {
                title: "برند 2",
                value: "brand 2"
            },
            {
                title: "برند 3",
                value: "brand 3"
            },
        ]
    },
    {
        title: "رنگ",
        name: "color",
        options: [
            {
                title: "رنگ 1",
                value: "color 1"
            },
            {
                title: "رنگ 2",
                value: "color 2"
            },
            {
                title: "رنگ 3",
                value: "color 3"
            },
        ]
    },
    {
        title: "سایز",
        name: "size",
        options: [
            {
                title: "سایز 1",
                value: "size 1"
            },
            {
                title: "سایز 2",
                value: "size 2"
            },
            {
                title: "سایز 3",
                value: "size 3"
            },
        ]
    },
]


export default function CategoryPage() {

    const [filters, setFilters] = useState([
        {
            name:'brand',
            values: ['brand 1' , 'brand 2']
        }
    ]);



    const changeFiltersHandler = (newFilters)=>{
        setFilters(newFilters);
    } 
    

    return (
        <div className="container mx-auto">
            <div className="flex flex-col flex-wrap justify-between">
                <div className="w-full flex gap-3 mb-5">
                    {
                        allFilters.map((filter , index)=>(
                            <Filter key={index} filters={filters} title={filter.title} name={filter.name} options={filter.options} changeFilters={changeFiltersHandler}/>
                        ))
                    }
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                    {
                        filters && filters.map(filter=>(
                            filter.values.map(val=>(
                                <div key={val} className="px-3 py-2 bg-white-100 flex items-center gap-x-2 rounded-md">
                                    {val}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w=4 h-4 cursor-pointer hover:opacity-50" onClick={()=>removeChangeHandler(item.id)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                )
                            )
                        ))
                    }
                </div>
                <div className="w-full flex flex-wrap">
                    {
                        products && products.map(product=>(
                            <ProductCard
                            key={product.id}
                            classes={'w-full md:w-[calc(33%-30px)] xl:w-[calc(25%-30px)]'}
                            img="products/p1.jpg"
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            />
                        ))
                    }
                    
                </div>
            </div>
        </div>
    );
}
