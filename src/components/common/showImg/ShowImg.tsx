'use client'
import React from "react";
import Image from "next/image";

interface ShowImgProps {
  bucketName: string;
  fileName: string;
  width: number;
  height: number;
  fill?: boolean;
  classes?: string;
  onClickCustom?: () => void;
  alt?: string;
}

const ShowImg: React.FC<ShowImgProps> = ({
  bucketName, 
  fileName,
  width,
  height,
  fill = false,
  classes,
  onClickCustom,
  alt = "",
}) => {


  const APIURL = process.env.NEXT_PUBLIC_S3_URL;
  let imageUrl = '';
  if(bucketName && fileName){
    imageUrl = `${APIURL}/${bucketName}/${fileName}`;
  }else{
    imageUrl = `/images/vandad_logo.png`;
  }

  return (

    <>

      {
        fill ? 
        (
          <>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              onClick={onClickCustom}
              className={classes}
              alt={alt}
              src={imageUrl}
              fill 
            />
          </div>
          </>
        )
        :
        (
          <>
            <Image
            onClick={onClickCustom}
            className={classes}
            alt={alt}
            src={imageUrl}
            width={width}
            height={height}
            />
          </>
        )
      }

    </>

  );
};

export default ShowImg;
