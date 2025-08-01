import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

type SliderProps = {
  classes: string;
  title: string;
  desc: string;
  img: string;
  link: string;
  active: boolean;
};

const SliderItem = ({
  classes,
  title,
  desc,
  img,
  link,
  active,
}: SliderProps) => {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const imageUrl = `${process.env.NEXT_PUBLIC_MINIO}/${img}`;

  return (
    <div
      className={`w-full md:h-[600px] pb-[120px] pt-[60px] md:pt-[145px] relative flex `}
      style={{
        backgroundImage: img ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full container  mx-auto flex flex-col md:flex-row md:justify-between gap-y-3">
        <div
          className={`w-full h-fit my-auto md:w-fit order-2 md:order-1 flex justify-center items-center flex-col ${
            active ? "animate-my-fade-up" : "opacity-0"
          }`}
        >
          <span className="text-gray-900 dark:text-white-100 text-[1.2rem] md:text-[2rem] font-bold md:font-black text-center mb-2 md:mb-3">
            {title}
          </span>
          <span className="text-gray-800 dark:text-white-100 text-[0.9rem] md:text-[1.2rem] font-light text-center mb-4 md:mb-8">
            {desc}
          </span>
          {link ? (
            <Link
              href={link}
              className="w-fit py-[8px] px-[20px] md:px-[48px] bg-btnColor-100 duration-300 rounded-md text-[0.8rem] md:text-[0.9rem] font-light text-primaryText-100 mx-auto md:mx-0"
            >
              مشاهده
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
