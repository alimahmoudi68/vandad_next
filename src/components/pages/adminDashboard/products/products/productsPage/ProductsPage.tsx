"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import ShowImg from "@/components/common/showImg/ShowImg";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";
import { products } from "@/services/adminDashboard/products/productsService";
import ModalRemove from '@/components/modals/dashboard/modalDeleteProduct/ModalDeleteProduct';
import { IProduct } from '@/types/products';


export default function ProductsPage() {

  const [items, setItems] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>();
  const [loading, setLoading] = useState(true);   
  const [currentItem, setCurrentItem] = useState<IProduct>();
  const [showModalRemove , setShowModalRemove] = useState(false);

  const stateModalRemove = (state: boolean, item: IProduct) => {
    setShowModalRemove(state);
    setCurrentItem(item);
  }

  const getData = async (p: number , q: string) => {
    setLoading(true);
    let data = await products(p,q);
    console.log(data);
    setLoading(false);
    if (data && data.status === "success" && Array.isArray(data.products)) {
      setItems(data.products);
      setPage(data.pagination?.page || 1);
      setPages(data.pagination?.pages || 1);
    }
  };

  useEffect(() => {
    getData(1 , "");
  }, []);


  const goPage = async (p: number) => {
    getData(p , "");
  }


  const doneRemove = (id: number) => {
    let oldItems = [...items];
    let newItems = oldItems.filter(item=>item.id !== id);
    setItems(newItems);
}

  return (
    <>
     {
        showModalRemove && currentItem ? 
        (
            <ModalRemove
            show={showModalRemove}
            close={() => setShowModalRemove(false)}
            done={doneRemove}
            item={currentItem}
            />
        )
        :
        (
            null
        )
    }
    <div className="container mx-auto p-3">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-textPrimary-100 dark:text-white text-2xl font-extrabold">
          محصولات
        </h1>
        <Link
          href={"/admin-dashboard/products/new"}
          className="text-center md:w-[200px] rounded-md p-2 bg-primary-100 border border-primary-100 hover:bg-transparent hover:text-primary-100 text-white-100 font-semibold"
        >
          محصول جدید
        </Link>
      </div>

      <div className="w-full hidden md:flex justify-between bg-background-100 dark:bg-darkBack-100 py-[20px] sticky top-[-40px]">
        <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          تصویر
        </div>
        <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          عنوان
        </div>
        <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          قیمت
        </div>
        <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          دسته بندی
        </div>
        <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          عملیات
        </div>
      </div>

      {loading ? (
        <SkeletonLoading rows={5} cols={1} itemClasses={"h-[100px]"} />
      ) : (
        <>
          {items &&
            items.map((product, index) => {
              return (
                <div key={index}>
                  <div className="w-full">
                    <div className="w-full rounded-md bg-white-100 dark:bg-cardDark-100 py-5 px-5 my-5 md:px-0 flex flex-wrap items-center justify-start">
                      
                      <div className="w-full h-[100px] md:w-[20%] flex justify-start md:justify-center items-center">
                        <ShowImg bucketName={product?.thumbnail?.bucket} fill={true} classes="w-full object-contain" fileName={product?.thumbnail?.location} width={100} height={50}/>
                      </div>

                      <div className="w-full md:w-[20%] flex justify-start md:justify-center items-center">
                        <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                          عنوان:
                        </span>
                        <span className="font-semibold text-textPrimary-100 dark:text-white-100 mr-1 md:mr-0">
                          {product.title}
                        </span>
                      </div>

                      <div className="w-full md:w-[20%] flex justify-center items-center">
                        <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                          قیمت:
                        </span>
                        <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                          {!product.discount ? (
                            <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                              {product.discountPrice.toLocaleString()}
                            </span>
                          ) : (
                            <>
                              <span className="text-red-500 line-through font-semibold mr-2">
                                {product.price.toLocaleString()}
                              </span>
                              <span className="text-textPrimary-100 dark:text-white-50 font-semibold">
                                {product.discountPrice.toLocaleString()}
                              </span>
                            </>
                          )}
                        </span>
                      </div>

                      <div className="w-full md:w-[20%] flex justify-center items-center">
                        <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                          دسته پدر:
                        </span>
                        <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                        {
                          product.categories.map((catItem: {title: string; id: number}) => (
                            <Link key={catItem.id} href={`/dashboard/categories/${catItem.id}`} className="py-1 px-3 rounded-md border">
                              {catItem.title}
                            </Link>
                          ))
                        }
                        </span>
                      </div>

                      <div className="w-full md:w-[20%] flex justify-end md:justify-center">
                      <Link href={`/admin-dashboard/products/${product.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 md:w-6 md:h-6 md:hover:stroke-primary-100 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 md:w-6 md:h-6 mr-1 md:hover:stroke-primary-100 cursor-pointer"
                          onClick={()=>stateModalRemove(true , product)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {items && items.length === 0 && (
            <span className="text-center my-10 mx-auto block">
              موردی پیدا نشد ):
            </span>
          )}
        </>
      )}
    </div>
    </>
  );
}
