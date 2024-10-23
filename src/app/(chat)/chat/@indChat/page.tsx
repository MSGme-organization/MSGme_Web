"use client";

import Image from "next/image";

const IndChat = () => {
  return (
    <div className="h-[100dvh] w-full flex justify-center items-center dark:bg-customGrey-black text-black dark:text-white">
      <div className="w-[80%] max-w-[350px]">
        <Image src="/svgs/chatPage.svg" alt="chat" height={500} width={500} />
        <h1 className="text-center text-3xl font-bold">Hi!, Welcome back</h1>
        <p className="text-center ">
          Ready to chat with everyone and join your favourite event this year?
          Let's chat with everyone.
        </p>
      </div>
    </div>
  );
};

export default IndChat;
