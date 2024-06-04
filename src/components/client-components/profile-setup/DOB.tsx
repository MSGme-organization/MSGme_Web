"use client";
import { Field, Form, Formik } from "formik";
import React from "react";
import Input from "../common-components/Input";
import * as Yup from "yup";

const validationSchema = Yup.object({
  dob: Yup.date().required("Required"),
});
type Props = {
  handleIncrement: () => void;
  handleDecrement: () => void;
};

const DOB = ({ handleDecrement, handleIncrement }: Props) => {
  const handleSubmit = (value: any) => {
    console.log(value);
    handleIncrement();
  };
  return (
    <div className="mt-14">
      <div className="text-center">
        <p className="font-bold text-[28px]">What is your birthday ?</p>
        <p className="font-regular text-[14px]">It will not show publicly</p>
      </div>
      <Formik
        initialValues={{ dob: "Select date" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-8">
          <div className="w-[100%]">
            <label className="font-medium text-[14px] " htmlFor="email">
              Date of birth
            </label>
            <Field name="dob">
              {({ form, field, ...rest }) => {
                return (
                  <Input
                    field={field}
                    rest={rest}
                    type="date"
                    placeholder="Select date"
                    classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] mt-1 ${
                      form?.errors?.dob && form?.touched?.dob
                        ? "dark:border-red-500 border-red-500"
                        : ""
                    }`}
                    error={
                      form?.errors?.dob && form?.touched?.dob
                        ? form?.errors?.dob
                        : ""
                    }
                  />
                );
              }}
            </Field>
          </div>
          <div className="mb-5 mt-8 flex justify-center items-center gap-6">
            <button
              className="text-nowrap rounded-[8px] bg-bgColor dark:bg-customGrey-dark text-textColor dark:text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%] max-w-[249px]"
              onClick={handleDecrement}
            >
              Back
            </button>
            <button
              type="submit"
              className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%] max-w-[249px]"
            >
              Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default DOB;
