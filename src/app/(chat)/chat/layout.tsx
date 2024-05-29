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

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <div className="h-[100dvh] w-full  bg-bgColor-light dark:bg-bgColor-dark flex relative">
      {screenWidth && screenWidth > 768 ? children : params.id ? "" : children}
      <div
        className={`w-full ${
          params.id ? "" : "hidden"
        }  h-full overflow-y-scroll bg-[#E9ECEF] md:block`}
      >
        {indChat}
      </div>
    </div>
  );
};

export default Layout;
