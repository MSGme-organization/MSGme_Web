"use client";

import Input from "@/components/client-components/common-components/Input";
import { PasswordSvg } from "@/components/client-components/HomeLayout/Svgs";
import Loading from "@/components/client-components/loader/Loading";
import { setPassword } from "@/query/auth/auth";
import { SetPassword } from "@/utils/formik-validation";
import { CloseEyeSvg, EyeSvg } from "@/utils/svgs";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [isShown, setShown] = useState(false);
  const [isShown2, setShown2] = useState(false);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: SetPassword,
    onSubmit: (value: any) => {
      passwordQuery.mutate(value);
    },
  });

  const passwordQuery = useMutation({
    mutationFn: setPassword,
    onSuccess: () => {
      router.push("/login");
      successToast("password changed successfully.");
    },
    onError: (error: any) => {
      formik.setErrors(error.response.data.data);
      errorToast(error.response.data.message);
    },
  });

  return (
    <Loading isLoading={passwordQuery.isPending}>
      <div className="flex justify-center w-[100%] h-[100%] mt-28  mb-20">
        <div className="bg-bgColor dark:bg-customGrey-black text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
          <div className="text-center">
            <p className="font-extrabold text-[24px] mt-3">Set password</p>
            <p className="text-[14px] mt-3 font-medium">
              Password and Confirm password must be same
            </p>
          </div>
          <FormikProvider value={formik}>
            <Form>
              <div className="mt-6 max-w-[518px]">
                <div className="w-[100%] mb-6">
                  <label
                    className="font-medium text-[18px] "
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
                <div className="w-[100%] mb-6">
                  <label
                    className="font-medium text-[18px] "
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
                <div className="mb-5">
                  <button
                    type="submit"
                    className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%]"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </Loading>
  );
};

export default ResetPassword;
