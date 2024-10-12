export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center w-[100%] h-[100%] mt-28 mb-20">
        <div className="bg-bgColor dark:bg-customGrey-black text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
          {children}
        </div>
      </div>
    </>
  );
}
