"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { getCourseCats } from "@/services/dashboard/course/courseCatsService";
import {
  singleCourse,
  updateCourse,
} from "@/services/dashboard/course/courseService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";
import ModalAdd from '@/components/modals/dashboard/modalNewEpisode/ModalNewEpisode';


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
  episodes,
}: EditCourseEpisodePageProps) {
  const router = useRouter();

  const [currentEpisode, setCurrentEpisode] = useState<IEpisode>();
  const [showModalAdd , setShowModalAdd] = useState(false);
  const [showModalEdit , setShowModalEdit] = useState(false);
  const [showModalRemove , setShowModalRemove] = useState(false);

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
    // Logic to add the episode
    console.log(episode)
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
      {episodes &&
        episodes.map((episode : IEpisode) => (
          <div key={episode.id}>
            <h2>{episode.title}</h2>
            <p>Price: {episode.price}</p>
            <p>Date: {episode.date}</p>
          </div>
        ))}

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
