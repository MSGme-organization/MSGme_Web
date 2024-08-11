"use client";
import { editProfile } from "@/query/profile/editprofile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfileData } from "@/redux/profile/profileSlice";
import { formatDate } from "@/utils/date";
import { CalendarIcon } from "@/utils/svgs";
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
    if (formatDate(data.dob) === value.dob) {
      handleIncrement();
      return;
    }
    const formData = new FormData();
    formData.append("dob", value.dob);
    formData.append("step", "2");
    dataQuery.mutate(formData);
  };

  return (
    <Loading isLoading={dataQuery.isPending}>
      <div className="mt-14">
        <div className="text-center">
          <p className="font-bold text-[28px]">What is your birthday ?</p>
          <p className="font-regular text-[14px]">It will not show publicly</p>
        </div>
        <Formik
          initialValues={{ dob: data.dob ? formatDate(data.dob) : null }}
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
                      RightIcon={CalendarIcon}
                      iconClass="text-[20px] text-[#96A1AF] end-[10px]"
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
                      {...field}
                      {...rest}
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
