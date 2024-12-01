"use client";

import { editProfile } from "@/query/profile/editprofile";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateProfileData } from "@/lib/redux/profile/profileSlice";
import { errorToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../common-components/Input";
import Loading from "../loader/Loading";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
});

type Props = {
  handleIncrement: () => void;
};

const FullName = ({ handleIncrement }: Props) => {
  const data = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const dataQuery = useMutation({
    mutationFn: editProfile,
    onSuccess: (res: any) => {
      handleIncrement();
      dispatch(updateProfileData(res.data.data));
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });

  const handleSubmit = (value: any) => {
    if(data.firstName === value.firstName && data.lastName === value.lastName) {
      handleIncrement();
      return;
    }
    const formData = new FormData();
    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("step", "1");
    dataQuery.mutate(formData);
  };

  return (
    <Loading isLoading={dataQuery.isPending}>
      <div className="mt-14">
        <div className="text-center">
          <p className="font-bold text-[28px]">What is your name?</p>
          <p className="font-regular text-[14px]">
            Choose the name for your account
          </p>
        </div>

        <Formik
          enableReinitialize
          initialValues={data}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="w-[100%]">
              <label className="font-medium text-[14px]" htmlFor="firstName">
                First Name
              </label>
              <Field name="firstName">
                {({ field, form, ...rest }: any) => {
                  return (
                    <Input
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
                      {...field}
                      {...rest}
                    />
                  );
                }}
              </Field>
            </div>
            <div className="w-[100%] mt-3">
              <label className="font-medium text-[14px]" htmlFor="lastName">
                Last Name
              </label>
              <Field name="lastName">
                {({ field, form, ...rest }: any) => {
                  return (
                    <Input
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
                      {...field}
                      {...rest}
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
    </Loading>
  );
};

export default FullName;
