"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { IProduct } from "@/types/products";
import ProductCard from "@/components/common/productCard/ProductCard";

// تعریف نوع props کامپوننت
interface NewProductsProps {
  products: IProduct[];
}

const NewProducts: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <div className="w-full mb-10 md:mb-20">
      <div className="w-full flex justify-between items-center mb-2 md:mb-4">
        <div className="flex text-primaryText-100 font-bold text-[1.2rem] md:text-[1.5rem] text-center mb-3">
          محصولات
          <span className="text-primary-100 mr-1 block">جدید</span>
        </div>
        <a
          href="/products"
          className="font-light text-primaryText-100 justify-center hover:text-primary-100"
        >
          مشاهده همه
        </a>
      </div>
      <div className="w-full">
        <Swiper
          modules={[]}
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                classes="w-full"
                title={product.title}
                img={product.thumbnail}
                slug={product.slug}
                price={product.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
