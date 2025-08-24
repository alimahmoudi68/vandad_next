"use client";
import React from "react";

type ICourseProperty = {
  keyTitle: string;
  value: string,
  icon: string
}

const CourseProperty = ({keyTitle , value , icon} : ICourseProperty) => {
  return (
      <div className="flex items-center gap-x-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-[20px] h-[20px] stroke-gray-500 dark:stroke-white-70">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        {value}
        <span className="">{keyTitle}</span>
      </div>
  );
};

export default CourseProperty;
