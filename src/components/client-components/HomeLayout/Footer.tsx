"use client";

import { useThemeMode } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type FooterProps = {
  footer?: boolean;
};

const Footer = ({ footer = true }: FooterProps) => {
  const theme = useThemeMode();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return footer
    ? theme.computedMode && (
        <div className="h-[100%] flex items-center px-5 xl:px-20 bg-bgColor dark:bg-customGrey-black  shadow-md min-h-[70px] gap-3 justify-between py-3">
          <div className="flex justify-center items-start lg:items-center gap-3 lg:gap-8 flex-col lg:flex-row">
            <p className=" text-customGrey dark:text-textColor-dark text-[14px]">
              © 2023 MSGme All rights Reserved
            </p>
            <p className=" text-customGrey dark:text-textColor-dark text-[14px]">
              Privacy Policy
            </p>
            <p className=" text-customGrey dark:text-textColor-dark text-[14px]">
              Term of Use
            </p>
          </div>
          <div className="flex justify-center items-start lg:items-center gap-3 lg:gap-8 flex-col-reverse lg:flex-row">
            <p className="text-customGrey dark:text-textColor-dark text-[14px] flex justify-center items-center gap-[6px] cursor-pointer">
              <span>
                <Image
                  src="/svgs/Global.svg"
                  alt="global-logo"
                  width={17}
                  height={17}
                />
              </span>
              English
            </p>
            <p className="text-customGrey dark:text-textColor-dark text-[14px] flex justify-center items-center gap-[6px] cursor-pointer">
              <span>
                <Image
                  src="/svgs/Dollar.svg"
                  alt="dollar-logo"
                  width={17}
                  height={17}
                />
              </span>
              USD
            </p>
            <p
              className="text-customGrey dark:text-textColor-dark text-[14px] flex justify-center items-center gap-[6px] cursor-pointer text-nowrap"
              onClick={theme.toggleMode}
            >
              <span>
                <Image
                  src={
                    theme.computedMode === "light"
                      ? "/svgs/Sun.svg"
                      : "/svgs/Moon.svg"
                  }
                  alt="moon-logo"
                  width={17}
                  height={17}
                />
              </span>
              {theme.computedMode === "dark" ? "Dark Mode" : "Light Mode"}
            </p>
          </div>
        </div>
      )
    : null;
};

export default Footer;
