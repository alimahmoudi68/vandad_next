import React, { useState } from "react";
import { toast } from 'react-toastify';

import Button from "@/components/common/button/Button";
import MasterModal from '@/components/modals/masterModal/MasterModal';
import {removeCourse} from '@/services/adminDashboard/course/courseService';

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

interface ModalDeleteCourseProps {
  item: ICourse;
  close: () => void;
  show: boolean;
  done: (id: number) => void;
}

const ModalDeleteCourse: React.FC<ModalDeleteCourseProps> = ({ item, close, done }) => {
  const [loading, setLoading] = useState(false);

  const closeHandler = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    close();
  };

  const removeHandler = async () => {
      if (!loading) {
        try {
          setLoading(true);
          const data  = await removeCourse(item.id);
  
          if (data.status == "success") {
            done(item.id);
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
      
    }else{
      done(item.id);
      closeHandler();
    }
  };

  return (
    <>
      <MasterModal close={close} title={'حذف دوره'}>
        <div className="w-full flex flex-col">
          <span className="txtConfirm my-3">
            {`آیا از حذف  ${item.title} مطمئن هستید؟`}
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

export default ModalDeleteCourse;
