import React, { useState } from "react";
import { toast } from 'react-toastify';

import Button from "@/components/common/button/Button";
import MasterModal from '@/components/modals/masterModal/MasterModal';
import {deleteUpload} from '@/services/dashboard/uploads/uploadsService';

interface ModalDeleteUploadProps {
  item: { id: string };
  close: () => void;
  show: boolean;
  done: (id: string) => void;
  removeFromServer: boolean
}

const ModalDeleteUpload: React.FC<ModalDeleteUploadProps> = ({ item, close, show, done , removeFromServer}) => {
  const [loading, setLoading] = useState(false);

  const closeHandler = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    close();
  };

  const removeHandler = async () => {
    if(removeFromServer){
      if (!loading) {
        try {
          setLoading(true);
          const data  = await deleteUpload(item.id);
  
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
      }
    }else{
      done(item.id);
      closeHandler();
    }
  };


  return (
    <>
      <MasterModal close={close} show={show} title={'حذف فایل'}>
        <div className="w-full flex flex-col">
          <span className="txtConfirm my-3">
            {`آیا از حذف فایل فیلم یا عکس با شناسه ${item.id} مطمئن هستید؟`}
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

export default ModalDeleteUpload;
