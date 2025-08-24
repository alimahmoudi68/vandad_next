import React from "react";

import MasterModal from '@/components/modals/masterModal/MasterModal';
import LazyVideoPlayer from "@/components/common/lazyVideoPlayer/LazyVideoPlayer";

interface ModalCourseVideoProps {
  videoUrl: string;
  close: () => void;
}

const ModalCourseVideo: React.FC<ModalCourseVideoProps> = ({ videoUrl, close }) => {

  const closeHandler = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    close();
  };

  return (
    <>
      <MasterModal close={close} title={''} noPadding={true}>
        <div className="w-full flex flex-col">
        
          <LazyVideoPlayer
            directUrl={videoUrl}
          />
      
        </div>
      </MasterModal>
    </>
  );
  
};

export default ModalCourseVideo;
