"use client";

import React from "react";

const HeaderBar = () => {
  return (
    <div className="h-[90px] bg-bgColor dark:bg-bgColor-dark flex flex-row align-middle">
      <div className="h-[90px]">
        <img src="./Logo.png" className="w-[100%] h-[100%]" alt="logo" />
      </div>
      <div>
        <a href="#feature" className="text-textColor dark:text-textColor-dark">
          Feature
        </a>
      </div>
      <div></div>
    </div>
  );
};

export default HeaderBar;
