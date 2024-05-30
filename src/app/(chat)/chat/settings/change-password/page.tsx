"use client";

import SettingsHeader from "@/components/client-components/settings/SettingsHeader";
import { EyeIcon, LockIcon } from "@/utils/svgs";
import { Label, TextInput } from "flowbite-react";
import React, { Fragment } from "react";

const ChangePassword = () => {
  const inputArr = [
    {
      label: "Current Password",
      type: "password",
      placeholder: "Enter your old password",
      onChange: () => {},
    },
    {
      label: "New Password",
      type: "password",
      placeholder: "Enter your old password",
      onChange: () => {},
    },
    {
      label: "Confirm New Password",
      type: "password",
      placeholder: "Enter your old password",
      onChange: () => {},
    },
  ];

  return (
    <div className="w-full h-full overflow-y-scroll md:w-[25%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white">
      <SettingsHeader headerText={"Change Password"} showLogout={false} />
      <div className="p-4 flex flex-col gap-2">
        {inputArr.map((input, index) => (
          <Fragment key={index}>
            <div className="mt-2">
              <Label className="font-bold my-2">{input.label}</Label>
            </div>
            <TextInput
              icon={LockIcon}
              rightIcon={EyeIcon}
              placeholder={input.placeholder}
              type="password"
            />
          </Fragment>
        ))}
        <div className="w-full flex justify-center items-center">
          <button className="mt-4 text-white font-semibold bg-primary p-3 rounded-lg active:scale-[.99]">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
