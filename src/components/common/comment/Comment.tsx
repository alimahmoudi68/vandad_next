"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { isEmpty } from "lodash";
import Image from "next/image";
import { toast } from "react-toastify";

import ShowImg from "@/components/common/showImg/ShowImg";
import { showNameOrPhone } from "@/utils/common/showNameOrPhone";
import { showDate } from "@/utils/common/showDate";
import Spinner from "@/components/common/loading/Loading";
import Button from "@/components/common/button/Button";
import Form from "../form/Form";
import {
  sendComment,
  getMoreComments,
} from "@/services/public/blog/blogComments";
import { IComment } from "@/types/blogComment";
import { IBlogComments } from "@/types/blogComment";
import { IForm } from "@/types/form";

interface ICommentPorps {
  data: IBlogComments;
  canRes: boolean;
  blogId: number;
}

const calculateLastPage = (pagination: IBlogComments["pagination"]) => {
  if (!pagination || pagination.limit <= 0) return 1;
  return Math.ceil(pagination.count / pagination.limit);
};

const Comments = ({ data, canRes, blogId }: ICommentPorps) => {
  const [comments, setComments] = useState<IComment[]>(data.comments);
  const [pageComment, setPageComment] = useState<number>(1);
  const [lastPageComments] = useState<boolean>(
    calculateLastPage(data.pagination) === pageComment
  );
  const [allowtMoreComment, setAllowtMoreComment] = useState(true);
  const [loadingBtnComment, setLoadingBtnComment] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showModalCommentResponse, setShowModalCommentResponse] =
    useState<Boolean>(false);
  const [currentComment, setCurrentComment] = useState<IComment | {}>({});

  const initForm = {
    formItems: [
      {
        inputType: "textarea",
        config: {
          label: "نظر",
          name: "content",
          classes: "w-full",
        },
        value: "",
        validation: {
          maxLength: 50,
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
    ],
  };

  const [form, setForm] = useState<IForm>(initForm);

  const sendCommentHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtnComment(true);
    try {
      let payload;

      if (form instanceof FormData) {
        payload = {
          content: form.get("content") as string,
        };
      } else {
        payload = {
          content: form.content,
        };
      }
      const data = await sendComment({ ...payload, parentId: null, blogId: blogId });

      if (data.status === "success") {
        toast.success("نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می شود");
      } else {
        toast.error(
          Array.isArray(data.message)
            ? data.message.join("، ")
            : data.message || "خطایی رخ داد"
        );
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "متاسفانه خطایی پیش آمد لطفا بعدا تلاش کنید"
      );
    } finally {
      setLoadingBtnComment(false);
    }
  };

  const moreCommentsHandler = async () => {
    // if (allowtMoreComment) {
    //   setLoading(true);
    //   setAllowtMoreComment(false);
    //   let { data } = await getMoreComments(
    //     props.type,
    //     props.id,
    //     pageComment + 1
    //   );
    //   if ((data.status = "success")) {
    //     // if (data.data.comments.page == data.data.comments.pages) {
    //     //     setLastPageComments(true);
    //     // }
    //     let oldComments = comments;
    //     setComments([...oldComments, ...data.data.comments.docs]);
    //     setPageComment(pageComment + 1);
    //     setAllowtMoreComment(true);
    //     setLoading(false);
    //     if (data.data.comments.page == data.data.comments.pages) {
    //       setLastPageComments(true);
    //     }
    //   } else {
    //     toast.error("مشکلی پیش آمه")
    //   }
    // }
  };

  const stateModalCommentResponse = (state: boolean, comment: IComment) => {
    setShowModalCommentResponse(state);
    setCurrentComment(comment);
  };

  return (
    <div className="w-full bg-white-100 dark:bg-dark-200 flex flex-col justify-center items-center shadow-my dark:shadow-none p-5 rounded-md text-[0.9rem] font-normal my-3">
      <div className="w-full flex justify-start items-center mb-5">
        <svg
          className="w-2 h-2 fill-primary-100 mr-1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <span className="text-primary-100 text-2xl font-extrabold">نظرات</span>
      </div>

      {/* <ModalCommentResponse
        show={showModalCommentResponse}
        close={() => stateModalCommentResponse(false, {})}
        comment={currentComment}
        id={props.id}
        type={props.type}
      /> */}

      {canRes ? (
        <Form
          initForm={form}
          submit={sendCommentHandler}
          loading={loadingBtnComment}
          submitTitle="ثبت"
          config={{
            forComment: true,
          }}
        />
      ) : (
        <div className="w-full flex flex-col items-center justify-between p-4 text-white-100 font-normal bg-amber-500 md:flex-row">
          <div className="flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs md:text-base">
              'برای ثبت نظر لطفا ابتدا لاگین کنید'
            </span>
          </div>
          <div className="mt-3 md:mt-0">
            <Link href="/auth/login" legacyBehavior>
              <a className="text-xs md:text-base group flex items-center transition-all duration-200 hover:text-gray-600">
                ورود
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="ml-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      )}
      {comments &&
        comments.map((comment: IComment, index: number) => (
          <div
            className="w-full rounded-xl bg-white-100 border border-gray-200 dark:border-cyan-500 p-4 my-3 dark:bg-dark-200"
            key={index}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                {/* <ShowImg
                  classes="rounded-full"
                  bucketName={'test'}
                  fileName={'test'}
                  width={64}
                  height={64}
                /> */}
                <span className="ml-3 font-normal text-sm text-slate-500 dark:text-white-50">
                  {showNameOrPhone(
                    comment?.user?.firstName,
                    comment?.user?.phone
                  )}
                </span>
                <span className="mx-1">-</span>
                <span className="font-normal text-xs text-slate-400 dark:text-white-50">
                  {showDate(comment.createdAt)}
                </span>
              </div>

              <div>
                {canRes ? (
                  <Button
                    classes="bg-primary-100 py-2 px-3 text-gray-800 font-semibold"
                    click={() => stateModalCommentResponse(true, comment)}
                  >
                    پاسخ
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="mt-5 font-normal text-base text-slate-600 text-start">
              {comment.content}
            </div>
            {/* -- پاسخ کامنت  */}
            {comment.childs &&
              comment.childs.map((comment2: IComment, index2: number) => (
                <div
                  className="bg-white-100 border border-gray-200 dark:border-cyan-500 dark:bg-dark-200 md:mr-[50px] rounded-xl p-4 mt-3"
                  key={index2}
                >
                  <div className="flex items-center">
                    {/* <ShowImg
                    classes="rounded-full"
                    bucketName={'test'}
                    fileName={'test'}
                    width={64}
                    height={64}
                  /> */}
                    <span className="ml-3 font-normal text-sm text-slate-500 dark:text-white-50">
                      {showNameOrPhone(
                        comment2?.user?.firstName,
                        comment2?.user?.phone
                      )}
                    </span>
                    <span className="mx-1">-</span>
                    <span className="font-normal text-xs text-slate-400 dark:text-white-50">
                      {showDate(comment2.createdAt)}
                    </span>
                  </div>
                  <div className="mt-5 font-normal text-base text-slate-600 text-start">
                    {comment2.content}
                  </div>
                </div>
              ))}
          </div>
        ))}
      {comments.length == 0 ? (
        <div className="flex flex-col justify-center items-center mt-3">
          {/* <Image
            width="64"
            height="64"
            src={`${process.env.NEXT_PUBLIC_S3_ENDPOINT_URL}?bucket=common&object=comment.png`}
            alt="no-comment"
          /> */}
          <span className="text-base font-medium mt-3 text-gray-400">
            نظری پیدا نشد
          </span>
        </div>
      ) : null}
      {lastPageComments !== true ? (
        <div className="flex flex-col justify-center items-center">
          <div
            className="flex justify-center items-center p-5 hover:cursor-pointer group"
            onClick={() => moreCommentsHandler()}
          >
            <span className="text-zinc-600 font-normal text-base transition-all duration-150 group-hover:text-zinc-400 dark:text-white-100">
              نمایش نظرات بیشتر
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 transition-all duration-150 stroke-zinc-600 group-hover:stroke-zinc-400 dark:stroke-white-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {loading ? <span>در حال دریافت نظرات...</span> : null}
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
