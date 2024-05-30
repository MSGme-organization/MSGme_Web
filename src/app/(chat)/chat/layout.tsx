"use client";

import { useParams } from "next/navigation";
import React from "react";

const Layout = ({
  children,
  indChat,
}: {
  children: React.ReactNode;
  indChat: React.ReactNode;
  params: {
    id: string;
  };
}) => {
  const params = useParams();
  const [screenWidth, setScreenWidth] = React.useState<number | null>(null);
  const [isMounted, setIsMounted] = React.useState<Boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);


  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-[100dvh] w-full  bg-bgColor-light dark:bg-bgColor-dark flex relative">
      {screenWidth && screenWidth > 768 ? children : params.id ? "" : children}
      <div
        className={`flex-grow ${
          params.id ? "" : "hidden"
        }  h-full  bg-[#E9ECEF] dark:bg-customGrey-black md:block`}
      >
        {indChat}
      </div>
    </div>
  );
};

export default Layout;
