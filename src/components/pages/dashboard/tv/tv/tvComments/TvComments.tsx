"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import ModalRemove from '@/components/modals/dashboard/modalDeleteCommentTv/ModalDeleteCommentTv';
import ModalAccept from '@/components/modals/dashboard/modalAcceptCommentTv/ModalAcceptCommentTv';
import ModalReject from '@/components/modals/dashboard/modalRejectCommentTv/ModalRejectCommentTv';
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";
import { getComments } from "@/services/dashboard/tv/tvCommentsService";
import ShowImg from "@/components/common/showImg/ShowImg";
import Pagination from '@/components/common/pagination/Pagination';
import { IItemsCommentTv } from "@/types/tvComment";
import { showNameOrPhoneComplete } from "@/utils/common/showNameOrPhone";

export default function BlogCommentsPage() {

    const [items, setItems] = useState<IItemsCommentTv[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>();
    const [loading, setLoading] = useState(true);
    const [currentItem, setCurrentItem] = useState<IItemsCommentTv>();
    const [showModalRemove , setShowModalRemove] = useState(false);
    const [showModalAccept , setShowModalAccept] = useState(false);
    const [showModalReject , setShowModalReject] = useState(false);

    const stateModalRemove = (state: boolean, item: IItemsCommentTv) => {
        setShowModalRemove(state);
        setCurrentItem(item);
    }

    const stateModalAccept = (state: boolean, item: IItemsCommentTv) => {
        setShowModalAccept(state);
        setCurrentItem(item);
    }


    const stateModalReject = (state: boolean, item: IItemsCommentTv) => {
        setShowModalReject(state);
        setCurrentItem(item);
    }


    const getData = async (p: number) => {
        setLoading(true);
        let data = await getComments(p);
        setLoading(false);
        if (data.status === "success") {
            setItems(data.comments || []);
            setPage(data.pagination?.page || 1);
            setPages(data.pagination?.pages || 1);
        } else {
            setLoading(false);
            toast.error(data?.message || "مشکلی پیش آمده لطفا بعدا تلاش کنید");
        }
    };

    const goPage = async (p: number) => {
        getData(p);
    }


    useEffect(() => {
        getData(1);
    }, []);


    const doneRemove = (id: number) => {
        let oldItems = [...items];
        let newItems = oldItems.filter(item=>item.id !== id);
        setItems(newItems);
    }


    const doneAcceptReject = (id: number) => {
        setItems(prev =>
          prev.map(item =>
            item.id === id ? { ...item, accepted: !item.accepted } : item
          )
        );
    };


    return (
        <>
        {
        showModalRemove && currentItem ? 
        (
            <ModalRemove
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
          {
        showModalAccept && currentItem ? 
        (
            <ModalAccept
            close={() => setShowModalAccept(false)}
            done={doneAcceptReject}
            item={currentItem}
            />
        )
        :
        (
            null
        )
        }
          {
        showModalReject && currentItem ? 
        (
            <ModalReject
            close={() => setShowModalReject(false)}
            done={doneAcceptReject}
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
            نظرات
        </h1>

        <div className="w-full hidden md:flex justify-between bg-background-100 dark:bg-darkBack-100 py-[20px] sticky top-[-40px]">
            <div className="w-[25%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            کاربر
            </div>
            <div className="w-[25%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            نظر
            </div>
            <div className="w-[25%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            وضعیت تایید
            </div>
            <div className="w-[25%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
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
                        {/* دسته‌بندی پدر */}
                        <div className="w-full rounded-md bg-white-100 dark:bg-cardDark-100 py-5 px-5 my-5 md:px-0 flex flex-wrap items-center justify-start">
                           
                           <div className="w-full md:w-[25%] flex justify-start md:justify-center items-center">
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                                کابر:
                                </span>
                                <span className="font-semibold text-textPrimary-100 dark:text-white-100 mr-1 md:mr-0">
                                {showNameOrPhoneComplete(item.user.firstName , item.user.phone)}
                                </span>
                            </div>

                            <div className="w-full md:w-[25%] flex justify-center items-center">
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                                نظر:
                                </span>
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                                {item.content}
                                </span>
                            </div>

                            <div className="w-full md:w-[25%] flex justify-center items-center">
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                                وضعیت تایید:
                                </span>
                                <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                                {
                                    item.accepted ? 
                                    (
                                       <span>تایید شده</span>
                                    )
                                    :
                                    (
                                        <span>تایید نشده</span>
                                    )
                                }
                                </span>
                            </div>

                            <div className="w-full md:w-[25%] flex justify-end md:justify-center">
                                {
                                    item.accepted ? 
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}   
                                        className="w-4 h-4 md:w-6 md:h-6 mr-1 md:hover:stroke-primary-100 cursor-pointer"
                                        onClick={()=>stateModalReject(true , item)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    )
                                    :
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} 
                                        className="w-4 h-4 md:w-6 md:h-6 mr-1 md:hover:stroke-primary-100 cursor-pointer"
                                        onClick={()=>stateModalAccept(true , item)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    )
                                }
                                <Link href={`/admin-dashboard/tvs/comments/${item.id}`}>
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
