"use client";

import { useAppDispatch } from "@/redux/hooks";
import { fetchProfile } from "@/redux/profile/profileSlice";
import { useParams } from "next/navigation";
import React from "react";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
  indChat: React.ReactNode;
  params: {
    id: string;
  };
}) => {
  const params = useParams();
  const [isMounted, setIsMounted] = React.useState<Boolean>(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setIsMounted(true);
    dispatch(fetchProfile());
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-[100dvh] w-full  bg-bgColor-light dark:bg-bgColor-dark flex relative">
      {children}
    </div>
  );
};

export default Layout;
