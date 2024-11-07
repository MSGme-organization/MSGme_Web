"use client";

import Image from "next/image";
import React from "react";
import { DownArrow, NavbarBurger, NavbarCross } from "./Svgs";
import Link from "next/link";
import { usePathname } from "next/navigation";


const HeaderBar = () => {
  const [nav, setNav] = React.useState(true);
  const pathname = usePathname();
  return (
    <div className=" px-5 xl:px-14 bg-bgColor dark:bg-customGrey-black shadow-sm  min-h-[90px] absolute w-full top-0 left-0">
      <section className="h-[100%] max-w-[1808px] w-full flex flex-row items-center justify-between p-4 my-0 mx-auto min-h-[90px]">
        <Link href="/" className="h-[100%] cursor-pointer" >
          <img
            src="./Logo.png"
            className="w-[100%] h-[100%] max-w-[132px] max-h-[132px]"
            alt="logo"
          />
        </Link>
        {pathname === "/" ? (
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
        ) : null}

        <div className={pathname === "/" ? "lg:flex hidden" : "lg:flex"}>
          {pathname === "/" ? (
            <Link href="/login">
              <button className=" text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] flex gap-[3px] justify-center items-center">
                <Image
                  src="/svgs/doubleDownArrow.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                Get Start
              </button>
            </Link>
          ) : (
            <button className=" text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] flex gap-[3px] justify-center items-center">
              <Image
                src="/svgs/phoneIcon.svg"
                alt="logo"
                width={24}
                height={24}
              />
              Contact Us
            </button>
          )}
        </div>
        {pathname === "/" ? (
          <div
            className="lg:hidden block text-textColor dark:text-textColor-dark"
            onClick={() => setNav((prev) => !prev)}
          >
            {nav ? <NavbarBurger /> : <NavbarCross />}
          </div>
        ) : null}
      </section>
      {pathname === "/" ? (
        <div
          className={
            nav
              ? " hidden px-6 "
              : "flex lg:hidden flex-col items-start justify-center px-6 gap-4 pb-4"
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
          <a className="flex text-primary font-bold text-[24px]">Get Start</a>
        </div>
      ) : null}
    </div>
  )
};

export default HeaderBar;
