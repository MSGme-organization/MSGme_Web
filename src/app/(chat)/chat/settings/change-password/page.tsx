"use client";

import Input from "@/components/client-components/common-components/Input";
import SettingsHeader from "@/components/client-components/settings/SettingsHeader";
import {
  ChangePasswordInitialValues,
  ChangePasswordValidationSchema,
} from "@/utils/formik-validation";
import { LockIcon } from "@/utils/svgs";
import { useFormik } from "formik";
import React from "react";

const inputArr = [
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
    placeholder: "Enter your old password",
    LeftIcon: LockIcon,
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your old password",
    LeftIcon: LockIcon,
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    type: "password",
    placeholder: "Enter your old password",
    LeftIcon: LockIcon,
  },
];
const ChangePassword = () => {
  const formik = useFormik({
    initialValues: ChangePasswordInitialValues,
    validationSchema: ChangePasswordValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <SettingsHeader headerText={"Change Password"} showLogout={false} />
      <form className="p-4 flex flex-col gap-2" onSubmit={formik.handleSubmit}>
        {inputArr.map((input, index) => (
          <Input
            {...formik.getFieldProps(input.name)}
            error={formik.errors[input.name as keyof typeof formik.errors]}
            key={index}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            LeftIcon={input.LeftIcon}
            required
            classes="ps-[44px]"
            iconClass=""
            RightIcon={null}
          />
        ))}
        <button
          type="submit"
          className="mt-4 text-white font-semibold bg-primary p-3 rounded-lg active:scale-[.99]"
        >
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
