"use client";
import Input from "@/components/client-components/common-components/Input";
import {
  MailSvg,
  PasswordSvg,
} from "@/components/client-components/HomeLayout/Svgs";
import { EmailValidation, RegisterValidation } from "@/utils/formik-validation";
import { CloseEyeSvg, EyeSvg, UserIcon } from "@/utils/svgs";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterInitialValue = {
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
};

const Register = () => {
  const [isShown, setShown] = useState(false);
  const [isShown2, setShown2] = useState(false);

  const router = useRouter();
  const handleSubmit = (value: any) => {
    console.log(value);
    router.push("/profile-details");
  };
  return (
    <div className="flex justify-center w-[100%] h-[100%] mt-28 mb-20">
      <div className="bg-bgColor dark:bg-customGrey-dark text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
        <div className="text-center">
          <p className="font-extrabold text-[24px] mt-3">Let's get started</p>
          <p className="text-[14px] mt-3 font-medium">
            Join us here, a better place for every conversation
          </p>
        </div>
        <Formik
          initialValues={RegisterInitialValue}
          validationSchema={RegisterValidation}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mt-6 max-w-[518px]">
              <div className="w-[100%] mb-4">
                <label
                  className="font-semibold text-[14px] "
                  htmlFor="userName"
                >
                  User Name{" "}
                </label>
                <Field name="userName">
                  {({ field, form, ...rest }: any) => {
                    return (
                      <Input
                        field={field}
                        rest={rest}
                        type="text"
                        placeholder="Username"
                        classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] ps-[36px] ${
                          form?.errors?.userName && form?.touched?.userName
                            ? "dark:border-red-500 border-red-500"
                            : ""
                        }`}
                        LeftIcon={UserIcon}
                        iconClass="h-[20px] w-[20px]"
                        error={
                          form?.errors?.userName && form?.touched?.userName
                            ? form?.errors?.userName
                            : ""
                        }
                      />
                    );
                  }}
                </Field>
              </div>
              <div className="w-[100%] mb-4">
                <label className="font-semibold text-[14px] " htmlFor="email">
                  Email address
                </label>
                <Field name="email">
                  {({ field, form, ...rest }: any) => {
                    return (
                      <Input
                        field={field}
                        rest={rest}
                        type="text"
                        placeholder="email@example.com"
                        classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] ps-[36px] ${
                          form?.errors?.email && form?.touched?.email
                            ? "dark:border-red-500 border-red-500"
                            : ""
                        }`}
                        LeftIcon={MailSvg}
                        iconClass="h-[20px] w-[20px]"
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
              <div className="w-[100%] mb-4">
                <label
                  className="font-semibold text-[14px] "
                  htmlFor="password"
                >
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
                        iconClass="h-[18px] w-[18px] right-5"
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
              <div className="w-[100%] mb-3">
                <label
                  className="font-semibold text-[14px] "
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <Field name="confirmPassword">
                  {({ field, form, ...rest }: any) => {
                    return (
                      <Input
                        field={field}
                        rest={rest}
                        type={isShown2 ? "text" : "password"}
                        placeholder="Confirm Password"
                        classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] ps-[36px] ${
                          form?.errors?.confirmPassword &&
                          form?.touched?.confirmPassword
                            ? "dark:border-red-500 border-red-500"
                            : ""
                        }`}
                        LeftIcon={PasswordSvg}
                        rightIconToggle={() => setShown2((prev) => !prev)}
                        RightIcon={isShown2 ? EyeSvg : CloseEyeSvg}
                        iconClass="h-[18px] w-[18px] right-5"
                        error={
                          form?.errors?.confirmPassword &&
                          form?.touched?.confirmPassword
                            ? form?.errors?.confirmPassword
                            : ""
                        }
                      />
                    );
                  }}
                </Field>
              </div>
              <div className="flex items-center justify-start gap-2 my-4 ms-2">
                <input
                  type="checkbox"
                  className="focus:ring-offset-0 focus:ring-0 rounded-sm text-primary"
                />
                <p className="text-center  text-[14px]">
                  I accept the
                  <span className="text-primary font-semibold">
                    {" "}
                    Terms of service
                  </span>{" "}
                  and
                  <span className="text-primary font-semibold">
                    {" "}
                    Privacy policy
                  </span>
                </p>
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%]"
                >
                  Sign up
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <div className="text-center">
          <p className="text-[14px] mt-3 font-medium">
            Already a Member?{" "}
            <Link href="/login">
              <span className="font-semibold text-primary cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
