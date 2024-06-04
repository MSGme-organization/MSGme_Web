"use client";

import { Field, Form, Formik } from "formik";
import React from "react";
import Input from "../common-components/Input";
import * as Yup from "yup";
const initialValues = {
  firstName: "",
  lastName: "",
};
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
});
type Props = {
  handleIncrement: () => void;
};
const FullName = ({ handleIncrement }: Props) => {
  const handleSubmit = (value: any) => {
    console.log(value);
    handleIncrement();
  };

  return (
    <div className="mt-14">
      <div className="text-center">
        <p className="font-bold text-[28px]">What is your name?</p>
        <p className="font-regular text-[14px]">
          Choose the name for your account
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="w-[100%]">
            <label className="font-medium text-[14px] " htmlFor="email">
              First Name
            </label>
            <Field name="firstName">
              {({ field, form, ...rest }: any) => {
                return (
                  <Input
                    field={field}
                    rest={rest}
                    type="text"
                    placeholder="First Name"
                    classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] mt-1 ${
                      form?.errors?.firstName && form?.touched?.firstName
                        ? "dark:border-red-500 border-red-500"
                        : ""
                    }`}
                    error={
                      form?.errors?.firstName && form?.touched?.firstName
                        ? form?.errors?.firstName
                        : ""
                    }
                  />
                );
              }}
            </Field>
          </div>
          <div className="w-[100%] mt-3">
            <label className="font-medium text-[14px] " htmlFor="email">
              Last Name
            </label>
            <Field name="lastName">
              {({ field, form, ...rest }: any) => {
                return (
                  <Input
                    field={field}
                    rest={rest}
                    type="text"
                    placeholder="Last Name"
                    classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] mt-1 ${
                      form?.errors?.lastName && form?.touched?.lastName
                        ? "dark:border-red-500 border-red-500"
                        : ""
                    }`}
                    error={
                      form?.errors?.lastName && form?.touched?.lastName
                        ? form?.errors?.lastName
                        : ""
                    }
                  />
                );
              }}
            </Field>
          </div>
          <div className="mb-5 mt-8">
            <button
              type="submit"
              className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%]"
            >
              Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FullName;
