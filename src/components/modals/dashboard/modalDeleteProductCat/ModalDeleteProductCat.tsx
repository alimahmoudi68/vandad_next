import React, { useState } from "react";
import { toast } from 'react-toastify';

import Button from "@/components/common/button/Button";
import MasterModal from '@/components/modals/masterModal/MasterModal';
import {removeCategory} from '@/services/dashboard/products/categoriesService';

interface ICategory {
  id: number;
  title: string;
  slug: string;
  [key: string] : any
}

interface ModalDeleteProductCatProps {
  item: ICategory;
  close: () => void;
  show: boolean;
  done: (id: number) => void;
}

const ModalDeleteProductCat: React.FC<ModalDeleteProductCatProps> = ({ item, close, done }) => {
  const [loading, setLoading] = useState(false);

  const closeHandler = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    close();
  };

  const removeHandler = async () => {
      if (!loading) {
        try {
          setLoading(true);
          const data  = await removeCategory(item.id);
  
          if (data.status == "success") {
            toast.success("دسته بندی با موفقیت حذف شد");
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
      <MasterModal close={close} title={'حذف دسته بندی محصولات'}>
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

export default ModalDeleteProductCat;
