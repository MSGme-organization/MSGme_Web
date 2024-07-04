"use client";

import { editProfile } from "@/query/profile/editprofile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfileData } from "@/redux/profile/profileSlice";
import { errorToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../common-components/Input";
import Loading from "../loader/Loading";


const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
});

type Props = {
  handleIncrement: () => void;
};

const FullName = ({ handleIncrement }: Props) => {
  const data = useAppSelector(state => state.profile);
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
    dataQuery.mutate({ step: 1, ...value });
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
              <label className="font-medium text-[14px]" htmlFor="first_name">
                First Name
              </label>
              <Field name="first_name">
                {({ field, form, ...rest }: any) => {
                  return (
                    <Input
                      field={field}
                      rest={rest}
                      type="text"
                      placeholder="First Name"
                      classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] mt-1 ${form?.errors?.first_name && form?.touched?.first_name
                        ? "dark:border-red-500 border-red-500"
                        : ""
                        }`}
                      error={
                        form?.errors?.first_name && form?.touched?.first_name
                          ? form?.errors?.first_name
                          : ""
                      }
                    />
                  );
                }}
              </Field>
            </div>
            <div className="w-[100%] mt-3">
              <label className="font-medium text-[14px]" htmlFor="last_name">
                Last Name
              </label>
              <Field name="last_name">
                {({ field, form, ...rest }: any) => {
                  return (
                    <Input
                      field={field}
                      rest={rest}
                      type="text"
                      placeholder="Last Name"
                      classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] mt-1 ${form?.errors?.last_name && form?.touched?.last_name
                        ? "dark:border-red-500 border-red-500"
                        : ""
                        }`}
                      error={
                        form?.errors?.last_name && form?.touched?.last_name
                          ? form?.errors?.last_name
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
    </Loading>
  );
};

export default FullName;
