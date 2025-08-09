"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showDate } from "@/utils/common/showDate";
import DOMPurify from 'dompurify';


import ModalAdd from '@/components/modals/dashboard/modalNewEpisode/ModalNewEpisode';
import ModalEdit from '@/components/modals/dashboard/modalEditEpisode/ModalEditEpisode';
import ModalDelete from '@/components/modals/dashboard/modalDeleteEpisode/ModalDeleteEpisode';

interface IEpisode {
  id: number,
  title: string,
  content: string,
  date: string
  time: string,
  price: number,
  created_at: string,
  upated_at: string,
}

interface EditCourseEpisodePageProps {
  courseId: number
  episodes: IEpisode[];
}

export default function EditCourseEpisodePage({
  courseId,
  episodes: initialEpisodes,
}: EditCourseEpisodePageProps) {
  const router = useRouter();


  const [episodes, setEpisodes] = useState<IEpisode[]>(initialEpisodes);
  const [currentEpisode, setCurrentEpisode] = useState<IEpisode>();
  const [showModalAdd , setShowModalAdd] = useState(false);
  const [showModalEdit , setShowModalEdit] = useState(false);
  const [showModalRemove , setShowModalRemove] = useState(false);

  useEffect(() => {
    setEpisodes(initialEpisodes);
  }, [initialEpisodes]);

  const stateModalAdd = (state: boolean) => {
    setShowModalAdd(state);
  }

  const stateModalEdit = (state: boolean, item: IEpisode) => {
    setShowModalEdit(state);
    setCurrentEpisode(item);
  }

  const stateModalRemove = (state: boolean, item: IEpisode) => {
    setShowModalRemove(state);
    setCurrentEpisode(item);
  }

  const addEpisodeHandler = (episode: IEpisode) => {
    setEpisodes([...episodes, episode]);
  } 

  const editEpisodeHandler = (episode: IEpisode) => {
    setEpisodes(episodes.map(e => e.id === episode.id ? episode : e));
  }

  const removeEpisodeHandler = (episodeId: number) => {
    setEpisodes(episodes.filter(e => e.id !== episodeId));
  }

  return (
    <>
        {
          showModalAdd  ? 
          (
              <ModalAdd
              courseId={courseId}
              close={() => setShowModalAdd(false)}
              done={addEpisodeHandler}
              />
          )
          :
          (
              null
          )
        }
        {
          showModalEdit ?
          (
            <ModalEdit episode={currentEpisode as IEpisode} close={() => setShowModalEdit(false)} done={editEpisodeHandler}/>
          )
          :
          (
            null
          )
        }
        {
          showModalRemove ?
          (
            <ModalDelete episode={currentEpisode as IEpisode} close={() => setShowModalRemove(false)} done={removeEpisodeHandler}/>
          )
          :
          (
            null
          )
        }
      <div className="flex flex-wrap gap-y-2 mb-8">
        <span className="text-sm font-semibold mb-1 font-medium text-[1.2rem]">جلسات دوره:</span>
        {episodes &&
        episodes.map((episode : IEpisode) => (
          <div key={episode.id} className="w-full border border-dashed flex flex-col p-3 text-gray-700 rounded-lg">
            <span>#{episode.id}</span>
            <span>
              <span className="text-sm font-semibold ml-1">عنوان جلسه:</span>
              <span>{episode.title}</span>
            </span>
            <div className="flex items-start gap-2">
              <span className="text-sm font-semibold whitespace-nowrap">توضیحات جلسه:</span>

              <div
                className="text-sm leading-6"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(episode.content) }}
              />
            </div>
            <span>
              <span className="text-sm font-semibold ml-1">مدت زمان جلسه:</span>
              <span>{episode.time}</span>
            </span>
            <span>
              <span className="text-sm font-semibold ml-1">تاریخ برگزاری:</span>
              <span>{showDate(episode.date)}</span>
            </span>
            <div className="w-full flex flex-wrap gap-y-2 items-center justify-between">
              <span>
                <span className="text-sm font-semibold ml-1">هزینه:</span>
                <span>{(episode.price).toLocaleString()} <span className="text-sm font-semibold ml-1">تومان</span></span>
              </span>
              <div className="flex items-center gap-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-4 h-4 md:w-6 md:h-6 stroke-primaryTextLight-100 md:hover:stroke-primary-100 cursor-pointer"
                    onClick={()=>stateModalEdit(true , episode)}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                </svg>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-4 h-4 md:w-6 md:h-6 stroke-primaryTextLight-100 md:hover:stroke-primary-100 cursor-pointer"
                onClick={()=>stateModalRemove(true , episode)}
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
        ))
      }
      </div>

      <div className="flex gap-x-2 items-center p-2 rounded-lg border cursor-pointer hover:opacity-80" onClick={() => stateModalAdd(true)}>
        افزودن قسمت
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[20px] h-[20px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </>
  );
}

