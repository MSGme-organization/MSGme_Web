"use client";

import { users } from "@/utils/data";
import { Dropdown, TextInput } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const dpItems = [
  {
    label: "Share",
    fn: () => {},
    icon: "/svgs/share.svg",
  },
  {
    label: "Mute",
    fn: () => {},
    icon: "/svgs/mute.svg",
  },
  {
    label: "Report",
    fn: () => {},
    icon: "/svgs/flag.svg",
  },
];

const Layout = ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const user = users.find((user) => user.id === parseInt(params.id));
  const router = useRouter();

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [children]);

  return (
    <div className="w-full min-h-[100dvh] relative py-[70px]">
      <div className="w-full bg-white absolute top-0 left-0 h-[70px] flex items-center justify-around">
        <div className="w-full px-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="md:hidden">
              <Image
                src={"/svgs/back.svg"}
                className="mr-1"
                width={25}
                height={25}
                alt="back"
              />
            </button>
            <Image
              width={40}
              height={40}
              src={user?.avatarImage || ""}
              alt="avtar"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-xl font-bold">{user?.name}</h1>
            </div>
          </div>
          <div className="flex">
            <button className="text-white px-4 py-2 rounded-md">
              <Image
                src={"/svgs/search.svg"}
                width={25}
                height={25}
                alt="search"
              />
            </button>
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <Image
                  className="cursor-pointer"
                  src={"/svgs/threeDots.svg"}
                  width={25}
                  height={25}
                  alt="menu"
                />
              )}
            >
              {dpItems.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={item.fn}
                  className="text-left w-full py-2 px-4 text-black flex gap-2 hover:bg-gray-100"
                >
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt={item.label}
                  />
                  <p className="ml-2 text-sm font-semibold">{item.label}</p>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>
      <div ref={ref} className="overflow-y-scroll h-[calc(100dvh-140px)]">
        {children}
      </div>
      <div className="w-full p-4 bg-white h-[70px] absolute bottom-0 left-0 flex gap-4">
        <TextInput
          className="w-[95%]"
          style={{
            border: 0,
            fontWeight: "bold",
            boxShadow: "none",
            outlineColor: "#38C585",
          }}
          placeholder="Type here"
        />

        <button className="text-white flex w-[40px] justify-center items-center  rounded-full hover:outline-primary hover:outline">
          <Image src={"/svgs/send.svg"} width={30} height={30} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Layout;
