"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const LogoHeader = (props: { path: string; classes?: string }) => {
  const { theme } = useTheme();
  const { classes = "w-[40px] h-[40px] md:w-[50px] md:h-[50px]" } = props;

  return (
    <Link href={props.path} className="flex items-center">
      <Image
        src={`${
          theme == "dark"
            ? "/images/vandad_logo.png"
            : "/images/vandad_logo.png"
        }`}
        className={classes}
        width={858}
        height={651}
        alt="logo"
        layout="raw"
      />
    </Link>
  );
};

export default LogoHeader;
