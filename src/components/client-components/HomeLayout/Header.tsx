"use client";

import Image from "next/image";
import React from "react";
import { DownArrow, NavbarBurger, NavbarCross } from "./Svgs";

const HeaderBar = () => {
  const [nav, setNav] = React.useState(true);

  return (
    <div className="px-5 xl:px-14 bg-customGrey-light dark:bg-customGrey-black shadow-md  min-h-[90px] absolute w-full top-0 left-0">
      <section className="h-[100%] max-w-[1808px] flex flex-row items-center justify-between p-4 my-0 mx-auto ">
        <div className="h-[100%]">
          <img
            src="./Logo.png"
            className="w-[100%] h-[100%] max-w-[132px] max-h-[132px]"
            alt="logo"
          />
        </div>
        <div className="lg:flex hidden items-center justify-center gap-10">
          <a
            href="#feature"
            className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
          >
            Feature
            <DownArrow />
          </a>
          <a
            href="#integrations"
            className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
          >
            Integrations
            <DownArrow />
          </a>
          <a
            href="#privacy"
            className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
          >
            Privacy
            <DownArrow />
          </a>
          <a
            href="#help"
            className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
          >
            Help Center
            <DownArrow />
          </a>
          <a
            href="#Blog"
            className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
          >
            Blog
            <DownArrow />
          </a>
        </div>
        <div className="lg:flex hidden ">
          <button className=" text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] flex gap-[3px] justify-center items-center">
            <Image
              src="/svgs/doubleDownArrow.svg"
              alt="logo"
              width={24}
              height={24}
            />
            Download
          </button>
        </div>
        <div
          className="lg:hidden block text-textColor dark:text-textColor-dark"
          onClick={() => setNav((prev) => !prev)}
        >
          {nav ? <NavbarBurger /> : <NavbarCross />}
        </div>
      </section>
      <div
        className={
          nav
            ? " hidden px-6 "
            : "flex lg:hidden flex-col items-start justify-center px-6 gap-4 "
        }
      >
        <a
          href="#feature"
          className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
        >
          Feature
          <DownArrow />
        </a>
        <a
          href="#integrations"
          className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
        >
          Integrations
          <DownArrow />
        </a>
        <a
          href="#privacy"
          className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
        >
          Privacy
          <DownArrow />
        </a>
        <a
          href="#help"
          className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
        >
          Help Center
          <DownArrow />
        </a>
        <a
          href="#Blog"
          className=" text-nowrap  font-semibold text-[18px] text-textColor dark:text-textColor-dark flex justify-start items-center gap-[6px]"
        >
          Blog
          <DownArrow />
        </a>
        <a className="flex text-primary font-bold text-[24px]">Download</a>
      </div>
    </div>
  );
};

export default HeaderBar;
