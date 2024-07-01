"use client";

import { redirect, usePathname } from "next/navigation";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: Boolean }) => {
  const pathname = usePathname();
  console.log(isAuthenticated, pathname);
  if (isAuthenticated && !pathname.includes("/chat")) {
    redirect("/chat");
  } else if (!isAuthenticated && pathname.includes("/chat")) {
    redirect("/login");
  }

  return <></>;
};

export default ProtectedRoute;
