"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import ModalRemove from '@/components/modals/dashboard/modalDeleteCourse/ModalDeleteCourse';
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";
import { getCourses } from "@/services/dashboard/course/courseService";
import ShowImg from "@/components/common/showImg/ShowImg";
import Pagination from '@/components/common/pagination/Pagination';


interface IUpload {
    bucket: string ,
    title: string,
    location: string
}


interface ICourse {
    id: number,
    title: string,
    slug: string,
    content: string,
    image: IUpload,
    categories: {id: number , title: string}[],
    created_at: string,
    upated_at: string,
}

export default function CoursesPage() {
    const router = useRouter();

    const [items, setItems] = useState<ICourse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>();
    const [key, setKey] = useState<string>('');
    const [debouncedKey, setDebouncedKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentItem, setCurrentItem] = useState<ICourse>();
    const [showModalRemove , setShowModalRemove] = useState(false);

    const stateModalRemove = (state: boolean, item: ICourse) => {
        setShowModalRemove(state);
        setCurrentItem(item);
    }

    const getData = async (p: number , q: string) => {
        setLoading(true);
        let data = await getCourses(p , q);
        setLoading(false);
        if (data.status === "success") {
            setItems(data.courses || []);
            setPage(data.pagination?.page || 1);
            setPages(data.pagination?.pages || 1);
        } else {
            setLoading(false);
            toast.error(data?.message || "مشکلی پیش آمده لطفا بعدا تلاش کنید");
        }
    };


    const goPage = async (p: number) => {
        getData(p , key);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setDebouncedKey(key);
        getData(1, key);
        }, 500); 

        return () => clearTimeout(timeoutId); 
    }, [key]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
    };

    const doneRemove = (id: number) => {
        let oldItems = [...items];
        let newItems = oldItems.filter(item=>item.id !== id);
        setItems(newItems);
    }


    const showCat = (catArr: {id: number , title: string}[]) => {
        if (!Array.isArray(catArr) || catArr.length === 0) {
          return '-';
        }
      
        return catArr.map(cat => cat.title).join('، ');
    };


    return (
        <>
        {
        showModalRemove && currentItem ? 
        (
            <ModalRemove
            show={true}
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
        <h1 className="text-textPrimary-100 dark:text-white text-2xl font-extrabold mb-3">
            دوره‌ها
        </h1>
        <div className="flex items-center justify-between items-center mb-10">
            <input
            className="w-full bg-white-100 md:w-[400px] p-3 rounded-md outline-none border border-gray-300 focus:border-primary-100"
            type="text"
            value={key}
            onChange={inputChangeHandler}
            placeholder="جستجو..."
            />
            <Link
            href={"/admin-dashboard/courses/new"}
            className="text-center md:w-[200px] rounded-md p-2 bg-primary-100 border border-primary-100 hover:bg-transparent hover:text-primary-100 text-white-100 font-semibold"
            >
            دوره جدید
            </Link>
        </div>

        <div className="w-full hidden md:flex justify-between bg-background-100 dark:bg-darkBack-100 py-[20px] sticky top-[-40px]">
            <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            عکس شاخص
            </div>
            <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            عنوان
            </div>
            <div className="w-[20%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            اسلاگ
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
                items.map((item, index) => {
                return (
                    <div key={index}>
                    <div className="w-full">
                        <div className="w-full rounded-md bg-white-100 dark:bg-cardDark-100 py-5 px-5 my-5 md:px-0 flex flex-wrap items-center justify-start">
                           
                            <div className="w-full md:w-[20%] flex justify-start md:justify-center items-center">
                                <ShowImg bucketName={item?.image?.bucket} classes="object-cover" fileName={item?.image?.location} width={100} height={100}/>
                            </div>
                           
                           <div className="w-full md:w-[20%] flex justify-start md:justify-center items-center">
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                                عنوان:
                                </span>
                                <span className="font-semibold text-textPrimary-100 dark:text-white-100 mr-1 md:mr-0">
                                {item.title}
                                </span>
                            </div>

                            <div className="w-full md:w-[20%] flex justify-center items-center">
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                                اسلاگ:
                                </span>
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                                {item.slug}
                                </span>
                            </div>

                            <div className="w-full md:w-[20%] flex justify-center items-center">
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                                دسته بندی:
                                </span>
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                                {showCat(item.categories)}
                                </span>
                            </div>

                            <div className="w-full md:w-[20%] flex justify-end md:justify-center">
                                <Link href={`/admin-dashboard/courses/${item.id}`}>
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
                                onClick={()=>stateModalRemove(true , item)}
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

            <Pagination pages={pages as number} current={page ?? 1} action={goPage} />

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
