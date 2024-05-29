"use client";
import { useThemeMode } from "flowbite-react";
import Image from "next/image";

export default function Home() {
  const theme = useThemeMode();
  return (
    <div className="text-textColor dark:text-textColor-dark">
      <div className="flex flex-col items-center">
        <div className="max-w-[912px] text-center mt-12 font-bold text-[30px] lg:text-[64px] lg:leading-[5rem]">
          The platform to <span className="text-[#FF5A7E]">co</span>
          <span className="text-primary">nn</span>
          <span className="text-[#FFD91D]">ect</span> People & sharing Events
        </div>
        <div className="text-center text-[20px] mt-4 max-w-[470px] font-normal">
          Simple, reliable and free* private messaging and calling, available
          worldwide.
        </div>
        <button className="mt-8 text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] flex gap-[3px] justify-center items-center">
          <Image
            src="/svgs/doubleDownArrow.svg"
            alt="logo"
            width={24}
            height={24}
          />
          Download
        </button>
      </div>
      <div className="flex flex-col items-center mt-[50px]">
        <Image
          src={
            theme.computedMode === "light"
              ? "/images/lightHome.png"
              : "/images/darkHome.png"
          }
          alt="home-light"
          width={1408}
          height={364}
        />
      </div>
    </div>
  );
}
