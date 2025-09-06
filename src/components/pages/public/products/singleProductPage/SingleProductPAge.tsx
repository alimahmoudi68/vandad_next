"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { toast } from "react-toastify";

import ShowImg from "@/components/common/showImg/ShowImg";
import { IProduct } from "@/types/products";
import { IUpload } from "@/types/upload";

const SingleProductPage = ({ product }: { product: IProduct }) => {

  console.log("p", product);


  const swiperRef = useRef<any>(null);
  const [allImages, setAllImages] = useState<IUpload[]>([]);
  const [productCount, setProductCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    let images= [...product.images]; // عکس‌های اصلی محصول
  

    setAllImages(images);
  }, [product]);




  const handleThumbClick = (index: number) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };


  const increaseCount = () => {
    let count = productCount;
    setProductCount(count + 1);
  };

  const decreaseCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

//   const addToCardHandler = (id, count) => {
//     // پیدا کردن ویژگی‌هایی که هنوز انتخاب نشده‌اند
//     if (variable_attributes) {
//       const notSelectedAttr = variable_attributes.find(
//         (attr) => !selectedOptions[attr.id]
//       );
  
//       if (notSelectedAttr) {
//         toast.error(`لطفا ${notSelectedAttr.name} مورد نظر را انتخاب کنید!`);
//         return;
//       }
//     }
  
//     // پیدا کردن واریانت مطابق با انتخاب کاربر
//     let chosenVariant = null;
//     if (variable_attributes && variable_attributes.length > 0) {
//       // ادغام ویژگی‌های ثابت با انتخاب‌های کاربر
//       const allSelected = { ...selectedOptions };
//       fixedAttr.forEach((attr) => {
//         allSelected[attr.id] = { value: attr.value };
//       });
//       chosenVariant = product.variants.find((variant) =>
//         variant.attributes.every(
//           (attr) => allSelected[attr.attribute_id]?.value === attr.value
//         )
//       );
//       if (!chosenVariant) {
//         toast.error("ترکیب انتخابی معتبر یافت نشد!");
//         return;
//       }
//       const available = chosenVariant?.inventory?.stock ?? 0;
//       if (count > available) {
//         toast.error("تعداد درخواستی بیش از موجودی است.");
//         return;
//       }
//     }
//     // محصول ثابت: بررسی موجودی اولین واریانت
//     if (!variable_attributes || variable_attributes.length === 0) {
//       const baseVariant = product.variants?.[0];
//       const available = baseVariant?.inventory?.stock ?? 0;
//       if (count > available) {
//         toast.error("تعداد درخواستی بیش از موجودی است.");
//         return;
//       }
//     }
  
//     // اگر واریانت پیدا شد، به سبد خرید اضافه کن
//     if (chosenVariant) {
//       console.log("Adding to cart:", chosenVariant, productCount);
//     } else {
//       console.log("Adding fixed product to cart:", product, productCount);
//     }
  
//     dispatch(
//       addToCart({
//         sku: chosenVariant?.sku ?? product.sku ?? product.variants?.[0]?.sku,
//         quantity: count,
//       })
//     );

//     toast.success("محصول با موفقیت به سبد خرید اضافه شد");
//   };
  
  

  return (
    <div className="container mx-auto">
      <div className="w-full font-extralight text-[1rem] mb-4 border border-border-100 p-5">
        <Link href="#" className="text-primary-100">
          خانه
        </Link>
        <span className="mx-1">/</span>
        {/* <Link href={} className="text-primary-100">
          {product.category.parentSlugs.name}
        </Link> */}
        <span className="text-primaryText-100">دسته بندی پدر</span>
        <span className="mx-1">/</span>
        <Link href={`/categories/دستهخ بنذی`} className="text-primary-100">
          {/* {product.category.name} */}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-primaryText-100">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4 border border-border-100 p-5 mb-4">
        <div className="w-full md:w-1/2 relative order-2 md:order-1 ">
          <div className="flex mb-10">
            <span className="block text-primaryText-100">دسته بندی:</span>
            <Link className="text-primary-100 mr-2" href={`/categories/refrefref`}>
              {/* {product.category.name} */}
            </Link>
          </div>

          <h1 className="font-bold text-prinmaryText-100 text-[2rem] mb-5">
            {product.title}
          </h1>

          {/* <span
            suppressHydrationWarning
            className="text-[2rem] font-medium text-primary-100 mb-3 block"
          >
            {(() => {
              const hasVariables = Array.isArray(variableAttr) && variableAttr.length > 0;
              if (hasVariables) {
                if (selectedVariant && selectedVariant.inventory?.price != null) {
                  return (
                    <>
                      {selectedVariant.inventory.price}
                      <span className="text-[2rem] font-medium text-primaryText-100 mr-2">تومان</span>
                    </>
                  );
                }
                if (minPrice != null && maxPrice != null) {
                  if (minPrice === maxPrice) {
                    return (
                      <>
                        {minPrice}
                        <span className="text-[2rem] font-medium text-primaryText-100 mr-2">تومان</span>
                      </>
                    );
                  }
                  return (
                    <>
                      {minPrice}
                      <span className="mx-2">-</span>
                      {maxPrice}
                      <span className="text-[2rem] font-medium text-primaryText-100 mr-2">تومان</span>
                    </>
                  );
                }
              }
              // بدون ویژگی متغیر یا fallback
              return (
                <>
                  {getPriceRange(product.variants)}
                  <span className="text-[2rem] font-medium text-primaryText-100 mr-2">تومان</span>
                </>
              );
            })()}
          </span> */}

          <p className="my-5">توضیحات محصول</p>


          {/* <div
                  className={`w-full py-3 flex items-center justify-center md:text-[1.2rem] text-center border duration-[200ms] ${
                    isDisabled
                      ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
                      : "bg-primary-100 text-white-100 border-primary-100 cursor-pointer hover:bg-transparent hover:text-primary-100"
                  }`}
                  aria-disabled={isDisabled}
                  onClick={() => {
                    if (isDisabled) {
                      const notSelectedAttr = variable_attributes.find((attr) => !selectedOptions[attr.id]);
                      if (notSelectedAttr) {
                        toast.error(`لطفا ${notSelectedAttr.name} مورد نظر را انتخاب کنید!`);
                      }
                      return;
                    }
                    addToCardHandler(product._id, productCount);
                  }}
                >
                  {isDisabled ? "ابتدا ویژگی‌های مورد نظر را انتخاب کنید" : "افزودن به سبد خرید"}
          </div> */}

        
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2">
          <Swiper
            modules={[]}
            className="w-full h-[300px] md:h-[500px] bg-black rounded-md"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
          >
            {allImages.map((item, index) => (
              <SwiperSlide
                key={index}
                className="w-full h-full flex items-center justify-center"
              >
                <ShowImg
                  width={500}
                  height={500}
                  alt={`Product image ${index + 1}`}
                  bucketName={item?.bucket} 
                  fileName={item?.location}
                  fill={true}
                  classes="object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* دایره‌های کوچک برای موبایل */}
          <div className="flex items-center justify-center gap-2 mt-1 md:hidden">
            {allImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border ${
                  index === activeIndex
                    ? "bg-primary-100 border-primary-100"
                    : "bg-transparent border-primaryText-100"
                }`}
              />
            ))}
          </div>

          {/* thumbnails */}
          <div className="hidden md:flex w-full h-auto justify-center gap-2 mt-4 overflow-x-auto px-2">
            {allImages.map((item, index) => (
              <div
                key={index}
                onClick={() => handleThumbClick(index)}
                className={`p-1 border rounded-md cursor-pointer transition duration-300 ${
                  index === activeIndex
                    ? "border-primary-100 shadow-lg"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <ShowImg
                  alt={`Thumbnail ${index + 1}`}
                  fill={false}
                  bucketName={item?.bucket}
                  fileName={item?.location}
                  width={100}
                  height={100}
                  classes="object-contain rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="w-full flex border border-border-100 p-5 mb-4">
        <div className="w-[20%]">
          <h2 className="font text-primaryText-100 text-[1.4rem]">
            نظرات کاربران
          </h2>
        </div>
        <div className="w-[80%]">

        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
