import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full overflow-y-scroll md:w-[20%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white">
      {children}
    </div>
  );
};

export default Layout;
