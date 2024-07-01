"use client";

import Footer from "@/components/client-components/HomeLayout/Footer";
import HeaderBar from "@/components/client-components/HomeLayout/Header";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <>
        <HeaderBar />
        <div className="min-h-[calc(100dvh-70px)] pt-24 pb-4 px-4 bg-customGrey-light  dark:bg-customGrey-blackBg">
          {children}
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <HeaderBar features={false} button="contact" />
        <div className="min-h-[calc(100dvh-70px)] pt-24 pb-4 px-4 bg-customGrey-light  dark:bg-customGrey-blackBg">
          {children}
        </div>
        <Footer />
      </>
    );
  }
}
