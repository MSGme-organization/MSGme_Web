import Footer from "@/components/client-components/HomeLayout/Footer";
import HeaderBar from "@/components/client-components/HomeLayout/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderBar />
      <div className="min-h-[calc(100dvh-68px)] bg-bgColor dark:bg-customGrey-blackBg  pt-24 pb-4 px-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
