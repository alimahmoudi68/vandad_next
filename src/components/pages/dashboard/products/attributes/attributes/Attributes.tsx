"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

import { updateAttributesAdmin, setLoading } from "@/store/attributesAdmin";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";

interface IAttribute {
  _id: string;
  title: string;
  slug: string;
  [key: string]: any;
}

interface AttributesPageProps {
  attributes: IAttribute[];
  permissions: string[];
}

export default function AttributesPage({
  permissions,
  attributes: initialAttributes,
}: AttributesPageProps) {

  const router = useRouter();
  const dispatch = useDispatch();
  const { attributes, loading } = useSelector(
    (state: RootState) => state.attributesAdmin
  );

  useEffect(() => {
    dispatch(setLoading()); 
    dispatch(updateAttributesAdmin(initialAttributes));
  }, [initialAttributes, dispatch]);

  

  return (
    <div className="container mx-auto p-3">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-textPrimary-100 dark:text-white text-2xl font-extrabold">
          ویژگی‌های محصولات
        </h1>
        <Link
          href={"/dashboard/attributes/new"}
          className="text-center md:w-[200px] rounded-md p-2 bg-primary-100 border border-primary-100 hover:bg-transparent hover:text-primary-100 text-white-100 font-semibold"
        >
          افزودن ویژگی جدید
        </Link>
      </div>

      <div className="w-full hidden md:flex justify-between bg-background-100 dark:bg-darkBack-100 py-[20px] sticky top-[-40px]">
        <div className="w-[30%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          عنوان
        </div>
        <div className="w-[30%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          اسلاگ
        </div>
        <div className="w-[10%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
          عملیات
        </div>
      </div>

      {loading ? (
        <SkeletonLoading rows={5} cols={1} itemClasses={"h-[100px]"} />
      ) : (
        <>
          {attributes &&
            attributes.map((attr, index) => {
              return (
                <div key={index} className="w-full">
                  {/* دسته‌بندی پدر */}
                  <div className="w-full rounded-md bg-white-100 dark:bg-cardDark-100 py-5 px-5 my-5 md:px-0 flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-[30%] flex justify-start md:justify-center items-center">
                      <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                        عنوان:
                      </span>
                      <span className="font-semibold text-textPrimary-100 dark:text-white-100 mr-1 md:mr-0">
                        {attr.title}
                      </span>
                    </div>

                    <div className="w-full md:w-[30%] flex justify-center items-center">
                      <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                        اسلاگ:
                      </span>
                      <span className="text-textPrimary-100 dark:text-white-100 font-semibold mr-1">
                        {attr.slug}
                      </span>
                    </div>

                    <div className="w-full md:w-[10%] flex justify-end md:justify-center">
                    <Link href={`/dashboard/attributes/${attr._id}`}>
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
                      <Link href={`/dashboard/attributes/delete/${attr._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 md:w-6 md:h-6 mr-1 md:hover:stroke-primary-100 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

          {attributes && attributes.length === 0 && (
            <span className="text-center my-10 mx-auto block">
              موردی پیدا نشد ):
            </span>
          )}
        </>
      )}
    </div>
  );
}
