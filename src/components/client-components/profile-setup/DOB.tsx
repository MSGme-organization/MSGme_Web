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
  dob: Yup.date().required("Required"),
});

type Props = {
  handleIncrement: () => void;
  handleDecrement: () => void;
};

const DOB = ({ handleDecrement, handleIncrement }: Props) => {
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
    dataQuery.mutate({ step: 2, ...value });
  };

  return (
    <Loading isLoading={dataQuery.isPending}>
      <div className="mt-14">
        <div className="text-center">
          <p className="font-bold text-[28px]">What is your birthday ?</p>
          <p className="font-regular text-[14px]">It will not show publicly</p>
        </div>
        <Formik
          initialValues={{ dob: data.dob }}
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
                      classes={`bg-gray-100 dark:bg-customGrey-blackBg h-[100%] min-h-[50px] mt-1 ${form?.errors?.dob && form?.touched?.dob
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
    </Loading>
  );
};

export default DOB;
