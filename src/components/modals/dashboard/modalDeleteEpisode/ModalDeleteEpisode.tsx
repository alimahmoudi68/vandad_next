import React, { useState } from "react";
import { toast } from 'react-toastify';

import Button from "@/components/common/button/Button";
import MasterModal from '@/components/modals/masterModal/MasterModal';
import {removeEpisode} from '@/services/adminDashboard/episode/episodeService';


interface IEpisode {
  id: number;
  title: string;
  content: string;
  date: string;
  time: string;
  price: number;
  created_at: string;
  upated_at: string;
}


interface ModalDeleteEpisodeProps {
  episode: IEpisode;
  close: () => void;
  done: (id: number) => void;
}

const ModalDeleteEpisode: React.FC<ModalDeleteEpisodeProps> = ({ episode, close, done }) => {
  const [loading, setLoading] = useState(false);

  const closeHandler = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    close();
  };

  const removeHandler = async () => {
      if (!loading) {
        try {
          setLoading(true);
          const data  = await removeEpisode(episode.id);
  
          if (data.status == "success") {
            done(episode.id);
            closeHandler();
          } else if(data.status == "error" && data.msg == 'Not Permission') {
            toast.error("شما اجازه حذف ندارید");
          }
          setLoading(false);
        } catch (err) {
          console.log(err)
          toast.error("متاسفانه مشکلی رخ داده است، دقایقی بعدا مجددا تلاش کنید");
          setLoading(false);
        }
      
    }
  };

  return (
    <>
      <MasterModal close={close} title={'حذف جلسه'}>
        <div className="w-full flex flex-col">
          <span className="txtConfirm my-3">
            {`آیا از حذف  ${episode.title} مطمئن هستید؟`}
          </span>
          <div className="w-full flex justify-center mt-5">
            <Button loading={loading} classes="w-20 py-1 px-2 bg-primary-100 rounded-md" click={removeHandler}>
              بله
            </Button>
            <Button classes="w-20 py-1 px-2 mr-3 bg-primary-100 rounded-md" click={() => closeHandler()}>
              انصراف
            </Button>
          </div>
        </div>
      </MasterModal>
    </>
  );
  
};

export default ModalDeleteEpisode;
