"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import ModalCommentRes from "@/components/modals/public/modalCommentRes/ModalCommentRes";
import { showNameOrPhone } from "@/utils/common/showNameOrPhone";
import { showDate } from "@/utils/common/showDate";
import Button from "@/components/common/button/Button";
import Form from "../form/Form";
import {
  sendCommentBlog,
  getMoreCommentsBlog,
} from "@/services/public/blog/blogComments";
import {
  sendCommentTv,
  getMoreCommentsTv,
} from "@/services/public/tvs/tvComments";

import { IBlogComments, IItemsCommentBlog } from "@/types/blogComment";
import { ITvComments, IItemsCommentTv } from "@/types/tvComment";
import { ICourseComments, IItemsCommentCourse } from "@/types/courseComment";
import { IForm } from "@/types/form";

// ------------------ Props Types ------------------
interface ICommentPropsBlog {
  type: "blog";
  blogId: number;
  canRes: boolean;
  data: IBlogComments;
}

interface ICommentPropsCourse {
  type: "course";
  courseId: number;
  canRes: boolean;
  data: ICourseComments;
}

interface ICommentPropsTv {
  type: "tv";
  tvId: number;
  canRes: boolean;
  data: ITvComments;
}

type ICommentProps = ICommentPropsBlog | ICommentPropsCourse | ICommentPropsTv;

// ------------------ Generic Comment Type ------------------
type CommentTypeMap = {
  blog: IItemsCommentBlog;
  course: IItemsCommentCourse;
  tv: IItemsCommentTv;
};

// ------------------ Helpers ------------------
const calculateLastTotalPages = (pagination: {
  count: number;
  page: number;
  limit: number;
}) => {
  if (!pagination || pagination.limit <= 0) return 1;
  return Math.ceil(pagination.count / pagination.limit);
};

// ------------------ Component ------------------
function Comments<T extends ICommentProps>(props: T) {
  const { data, canRes } = props;

  console.log('a' , calculateLastTotalPages(data.pagination))

  type IComment = T["type"] extends "blog"
    ? IItemsCommentBlog
    : T["type"] extends "course"
    ? IItemsCommentCourse
    : IItemsCommentTv;

  const [comments, setComments] = useState<IComment[]>(
    data.comments as IComment[]
  );
  const [pageComment, setPageComment] = useState<number>(1);
  const [lastPageComments] = useState<boolean>(() => {
    const lastTotalPages = calculateLastTotalPages(data.pagination);
    if (lastTotalPages === 0) {
      return true;
    }
    return lastTotalPages === pageComment;
  });
  const [loadingBtnComment, setLoadingBtnComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalCommentResponse, setShowModalCommentResponse] =
    useState<boolean>(false);
  const [currentComment, setCurrentComment] = useState<IComment | null>(null);

  const initForm: IForm = {
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

  const sendCommentHandler = async (
    formData: FormData | Record<string, any>
  ) => {
    setLoadingBtnComment(true);
    try {
      let payload: { content: string };

      if (formData instanceof FormData) {
        payload = {
          content: formData.get("content") as string,
        };
      } else {
        payload = {
          content: formData.content,
        };
      }

      let dataRes;

      if (props.type === "blog") {
        dataRes = await sendCommentBlog({
          ...payload,
          parentId: null,
          blogId: props.blogId,
        });
      } else if (props.type === "course") {
        // dataRes = await sendComment({ ...payload, parentId: null, courseId: props.courseId });
      } else if (props.type === "tv") {
        dataRes = await sendCommentTv({
          ...payload,
          parentId: null,
          tvId: props.tvId,
        });
      }

      if (dataRes && dataRes.status === "success") {
        setForm(initForm);
        toast.success(
          "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می شود"
        );
      } else if (dataRes) {
        const msg = Array.isArray(dataRes.message)
          ? dataRes.message.join("، ")
          : dataRes.message || "خطایی رخ داد";
        toast.error(msg);
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
    // TODO: فعال‌سازی بعداً
  };

  const stateModalCommentResponse = (
    state: boolean,
    comment: IComment | null
  ) => {
    setShowModalCommentResponse(state);
    setCurrentComment(comment);
  };

  return (
    <div className="w-full bg-white-100 dark:bg-cardDark-100 flex flex-col justify-center items-center shadow-my dark:shadow-none p-3 rounded-md text-[0.9rem] font-normal my-3">
      <div className="w-full flex justify-start items-center mb-3">
        <span className="text-primary-100 text-2xl font-extrabold">نظرات</span>
      </div>

      {showModalCommentResponse && props.type === "blog" && (
        <ModalCommentRes
          type="blog"
          parentId={currentComment ? currentComment.id : 0}
          close={() => stateModalCommentResponse(false, null)}
          blogId={props.blogId}
        />
      )}

      {showModalCommentResponse && props.type === "course" && (
        <ModalCommentRes
          type="course"
          parentId={currentComment ? currentComment.id : 0}
          close={() => stateModalCommentResponse(false, null)}
          courseId={props.courseId}
        />
      )}

      {showModalCommentResponse && props.type === "tv" && (
        <ModalCommentRes
          type="tv"
          parentId={currentComment ? currentComment.id : 0}
          close={() => stateModalCommentResponse(false, null)}
          tvId={props.tvId}
        />
      )}

      {canRes ? (
        <div className="w-full mb-5">
          <Form
            initForm={form}
            submit={sendCommentHandler}
            loading={loadingBtnComment}
            submitTitle="ثبت"
            config={{ forComment: true }}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-between p-4 text-white-100 font-normal bg-amber-500 md:flex-row mb-4 rounded-md">
          <div className="flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
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
              برای ثبت نظر لطفا ابتدا لاگین کنید
            </span>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href="/auth/login"
              className="text-xs md:text-base group flex items-center transition-all duration-200 hover:text-gray-600"
            >
              ورود
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {comments &&
        comments.map((comment, index) => (
          <div
            className="w-full rounded-xl bg-white-100 border border-gray-200 dark:border-bgDark-100 p-4 my-3 dark:bg-bgDark-100"
            key={index}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <Image
                  alt="user profile"
                  src="/images/default-avatar.webp"
                  className="rounded-full w-[32px] h-[32px] ml-2"
                  width={40}
                  height={40}
                />

                <span className="ml-3 font-normal text-sm text-slate-500 dark:text-white-100">
                  {showNameOrPhone(
                    comment?.user?.firstName,
                    comment?.user?.phone
                  )}
                </span>
                <span className="mx-1">-</span>
                <span className="font-normal text-xs text-slate-400 dark:text-white-100">
                  {showDate(comment.createdAt)}
                </span>
              </div>

              {canRes && (
                <Button
                  classes="bg-primary-100 py-2 px-3 text-gray-800 font-semibold"
                  click={() => stateModalCommentResponse(true, comment)}
                >
                  پاسخ
                </Button>
              )}
            </div>
            <div className="mt-5 font-normal text-base text-slate-600 dark:text-white-100 text-start">
              {comment.content}
            </div>

            {comment.childs &&
              comment.childs.map((comment2, index2) => (
                <div
                  className="border border-gray-200 dark:border-cardDark-100  md:mr-[50px] rounded-xl p-4 mt-3"
                  key={index2}
                >
                  <div className="flex items-center">
                    <Image
                      alt="user profile"
                      src="/images/default-avatar.webp"
                      className="rounded-full w-[32px] h-[32px] ml-2"
                      width={40}
                      height={40}
                    />
                    <span className="ml-3 font-normal text-sm text-slate-500 dark:text-white-100">
                      {showNameOrPhone(
                        comment2?.user?.firstName,
                        comment2?.user?.phone
                      )}
                    </span>
                    <span className="mx-1">-</span>
                    <span className="font-normal text-xs text-slate-400 dark:text-white-100">
                      {showDate(comment2.createdAt)}
                    </span>
                  </div>
                  <div className="mt-5 font-normal text-base text-slate-600 dark:text-white-100 text-start">
                    {comment2.content}
                  </div>
                </div>
              ))}
          </div>
        ))}

      {comments.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-3">
          <span className="text-base font-medium mt-3 text-primaryTextLight-400 dark:text-white-100">
            نظری پیدا نشد ):
          </span>
        </div>
      )}

      {!lastPageComments && (
        <div className="flex flex-col justify-center items-center">
          <div
            className="flex justify-center items-center p-5 hover:cursor-pointer group"
            onClick={moreCommentsHandler}
          >
            <span className="text-zinc-600 font-normal text-base group-hover:text-zinc-400 dark:text-white-100">
              نمایش نظرات بیشتر
            </span>
          </div>
          {loading && <span>در حال دریافت نظرات...</span>}
        </div>
      )}
    </div>
  );
}

export default Comments;
