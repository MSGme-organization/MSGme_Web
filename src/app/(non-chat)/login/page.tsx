"use client";

import { TextInput } from "flowbite-react";
import React from "react";

const Login = () => {
  return (
    <div className="grid place-content-center w-[100%] h-[100%]">
      <div className="bg-bgColor dark:bg-customGrey-dark text-textColor dark:text-textColor-dark max-w-[480px] p-8 rounded-[20px]">
        <div className="text-center">
          <p className=" font-extrabold text-[24px] mt-3">Hi, Welcome back</p>
          <p className="text-[14px] mt-3 font-medium">
            Enter your email and password to sign in
          </p>
        </div>
        <div className="mt-6">
          <form>
            <div className="">
              <label className="font-medium text-[18px] " htmlFor="email">
                Email address
              </label>
              {/* <TextInput
                id="email4"
                type="email"
                className="border-none mt-2 ps-2 bg-gray-100 dark:bg-customGrey-blackBg p-2 rounded-md placeholder:text-gray-400 focus:outline-none focus:outline-gray-300 focus:outline-1 text-textColor dark:text-textColor-dark max-w-[490px] w-[100%]"
                theme={{
                  base: "flex",
                  field: {
                    base: "relative w-full",

                    input: {
                      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                      colors: {
                        gray: "bg-gray-100 dark:bg-customGrey-blackBg placeholder:text-gray-400 focus:outline-gray-300 text-textColor dark:text-textColor-dark border-none",
                      },
                    },
                  },
                }}
                placeholder="name@flowbite.com"
                // required
                // addon={
                //   <input
                //     placeholder="abc@example.com"
                //     className="border-none mt-2 ps-2 bg-gray-100 dark:bg-customGrey-blackBg p-2 rounded-md placeholder:text-gray-400 focus:outline-none focus:outline-gray-300 focus:outline-1 text-textColor dark:text-textColor-dark max-w-[490px] w-[100%]"
                //   />
                // }
              /> */}

              <input
                placeholder="abc@example.com"
                className="border-none mt-2 ps-2 bg-gray-100 w-full dark:bg-customGrey-blackBg p-2 rounded-md placeholder:text-gray-400 focus:outline-none focus:outline-gray-300 focus:outline-1 text-textColor dark:text-textColor-dark max-w-[490px] w-[100%]"
              />
            </div>
            <div className="mt-[10px]">
              <label className="font-medium text-[18px] " htmlFor="email">
                Password
              </label>
              <input
                placeholder="Password"
                className="border-none mt-2 ps-2 bg-gray-100 dark:bg-customGrey-blackBg p-2 rounded-md placeholder:text-gray-400 focus:outline-none focus:outline-gray-300 focus:outline-1 text-textColor dark:text-textColor-dark max-w-[490px] w-[100%]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
