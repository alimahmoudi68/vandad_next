"use client";
// import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";

interface HeaderLinkProps {
  title: string;
  link: string;
  items?: any;
}

const HeaderLink = ({ title, link, items }: HeaderLinkProps) => {
  return (
    <Link
      href={link}
      className="flex items-center px-3 cursor-pointer ml-[8px] hover:bg-transparent transition-all header-nav text-[1rem] hover:text-primary-100 text-primaryTextLight-100 dark:text-white-100 dark:hover:text-primary-100"
    >
      {title}
    </Link>
  );
};

export default HeaderLink;
