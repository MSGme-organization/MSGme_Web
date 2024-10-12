"use client";

import Input from "@/components/client-components/common-components/Input";
import { MailSvg } from "@/components/client-components/HomeLayout/Svgs";
import Loading from "@/components/client-components/loader/Loading";
import { resetPassword } from "@/query/auth/auth";
import { EmailValidation } from "@/utils/formik-validation";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: EmailValidation,
    onSubmit: (value: any) => {
      resetPassQuery.mutate(value);
    },
  });

  const resetPassQuery = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      successToast("mail sent successfully.");
      router.push("/otp");
    },
    onError: (error: any) => {
      formik.setErrors(error.response.data.data);
      errorToast(error.response.data.message);
    },
  });

  return (
    <Loading isLoading={resetPassQuery.isPending}>
      <div className="text-center">
        <p className="font-extrabold text-[24px] mt-3">Reset password</p>
        <p className="text-[14px] mt-3 font-medium">
          We will send you link to reset your password
        </p>
      </div>
      <FormikProvider value={formik}>
        <Form>
          <div className="mt-6 max-w-[518px]">
            <div className="w-[100%] mb-6">
              <label className="font-medium text-[18px] " htmlFor="email">
                Email address
              </label>
              <Field name="email">
                {({ field, form, ...rest }: any) => {
                  return (
                    <Input
                      type="email"
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
                      {...field}
                      {...rest}
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
                Send
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
      <div className="text-center">
        <p className="text-[14px] mt-3 font-medium">
          Remember your password?{" "}
          <Link href="/login">
            <span className="font-semibold text-primary cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </Loading>
  );
};

export default ResetPassword;
