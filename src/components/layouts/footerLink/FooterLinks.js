'use client'
// import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const FooterLink = ({ title , link , icon }) => {

  return (
    <Link
      href={link}
      className="cursor-pointer flex flex-col justify-center items-center font-extralight text-[0.8rem] text-primaryText-100 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} className="w-[24px] h-[24px] stroke-primaryText-100">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      {title}
    </Link>
  )
    
}

export default FooterLink;