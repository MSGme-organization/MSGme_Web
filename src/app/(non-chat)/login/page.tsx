"use client";

import Input from "@/components/client-components/common-components/Input";
import {
  MailSvg,
  PasswordSvg,
} from "@/components/client-components/HomeLayout/Svgs";
import { LoginValidation } from "@/utils/formik-validation";
import { CloseEyeSvg, EyeSvg } from "@/utils/svgs";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const loginInitialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const [isShown, setShown] = useState(false);
  const handleSubmit = (value: any) => {
    console.log(value);
  };
  return (
    <div className="flex justify-center w-[100%] h-[100%] mt-28">
      <div className="bg-bgColor dark:bg-customGrey-dark text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
        <div className="text-center">
          <p className="font-extrabold text-[24px] mt-3">Hi, Welcome back</p>
          <p className="text-[14px] mt-3 font-medium">
            Enter your email and password to sign in
          </p>
        </div>
        <Formik
          initialValues={loginInitialValue}
          validationSchema={LoginValidation}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mt-6 max-w-[518px]">
              <div className="w-[100%]">
                <label className="font-medium text-[18px] " htmlFor="email">
                  Email address
                </label>
                <Field name="email">
                  {({ field, form, ...rest }: any) => {
                    return (
                      <Input
                        field={field}
                        rest={rest}
                        type="text"
                        placeholder="abc@example.com"
                        classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] ps-[36px] ${
                          form?.errors?.email && form?.touched?.email
                            ? "dark:border-red-500 border-red-500"
                            : ""
                        }`}
                        LeftIcon={MailSvg}
                        iconClass="h-[18px] w-[18px]"
                        error={
                          form?.errors?.email && form?.touched?.email
                            ? form?.errors?.email
                            : ""
                        }
                      />
                    );
                  }}
                </Field>
              </div>
              <div className="mt-[10px]">
                <label className="font-medium text-[18px] " htmlFor="email">
                  Password
                </label>
                <Field name="password">
                  {({ field, form, ...rest }: any) => {
                    return (
                      <Input
                        field={field}
                        rest={rest}
                        type={isShown ? "text" : "password"}
                        placeholder="Password"
                        classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] ps-[36px] ${
                          form?.errors?.password && form?.touched?.password
                            ? "dark:border-red-500 border-red-500"
                            : ""
                        }`}
                        LeftIcon={PasswordSvg}
                        rightIconToggle={() => setShown((prev) => !prev)}
                        RightIcon={isShown ? EyeSvg : CloseEyeSvg}
                        iconClass="h-[18px] w-[18px] right-5 "
                        error={
                          form?.errors?.password && form?.touched?.password
                            ? form?.errors?.password
                            : ""
                        }
                      />
                    );
                  }}
                </Field>
              </div>
            </div>
            <div>
              <p className="text-center font-semibold text-primary text-[14px] my-[20px] cursor-pointer">
                <Link href="/reset-password">Forgot your password?</Link>
              </p>
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%]"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
        <div className="text-center">
          <p className="text-[14px] mt-3 font-medium">
            Not registered yet?{" "}
            <Link href="/register">
              <span className="font-semibold text-primary cursor-pointer">
                Create an Account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
