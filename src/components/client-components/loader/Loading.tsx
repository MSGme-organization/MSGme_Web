"use client";

import React from "react";

const Loading = ({ isLoading, children }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  const disableScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  const enableScroll = () => {
    window.onscroll = function () {};
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isLoading) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isLoading]);

  if (!isMounted) {
    return null;
  }

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
