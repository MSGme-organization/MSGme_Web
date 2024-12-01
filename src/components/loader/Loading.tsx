"use client";

import React from "react";

const Loading = ({ isLoading, children }) => {

  const disableScroll = () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  const enableScroll = () => {
    window.onscroll = function () {};
  };


  React.useEffect(() => {
    if (isLoading) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isLoading]);

 
  return (
    <>
      {children}
      {isLoading && (
        <div className="relative z-[1050] block">
          <div className="fixed top-0 left-0 bottom-0 z-[1055] right-0 bg-[#00000099] flex justify-center items-center overflow-hidden">
            <div className="loader-spinner" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
