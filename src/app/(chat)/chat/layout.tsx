"use client";

import React from "react";

const layout = ({
  children,
  indChat,
}: {
  children: React.ReactNode;
  indChat: React.ReactNode;
}) => {
  return (
    <div className="h-[100dvh] w-full bg-bgColor-light dark:bg-bgColor-dark flex">
      <div className="w-[20%] h-full overflow-y-scroll">{children}</div>
      <div className="w-[80%] h-full overflow-y-scroll bg-[#E9ECEF]">
        {indChat}
      </div>
    </div>
  );
};

export default layout;
