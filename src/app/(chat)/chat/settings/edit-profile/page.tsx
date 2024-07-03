"use client";

import Input from "@/components/client-components/common-components/Input";
import Loading from "@/components/client-components/loader/Loading";
import SettingsHeader from "@/components/client-components/settings/SettingsHeader";
import { editProfile } from "@/query/profile/editprofile";
import { useAppSelector } from "@/redux/hooks";
import {
  EditProfileInitialValues,
  EditProfileValidationSchema,
} from "@/utils/formik-validation";
import { CalendarIcon, DeleteIcon, EmailIcon, UserIcon } from "@/utils/svgs";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import toast from "react-hot-toast";

const fields = [
  {
    label: "Username",
    placeholder: "Enter Username",
    type: "text",
    name: "username",
    LeftIcon: UserIcon,
    RightIcon: null,
    required: false,
    error: false,
    errorMessage: "",
    classes: "ps-[44px]",
    iconClass: "opacity-90  h-[20px] w-[20px]",
  },
  {
    label: "Email Address",
    placeholder: "Enter Email Address",
    type: "email",
    name: "email",
    LeftIcon: EmailIcon,
    RightIcon: null,
    required: false,
    classes: "ps-[44px]",
    iconClass: "opacity-90",
  },
  {
    label: "Date of Birth",
    placeholder: "Enter Date Of Birth",
    type: "date",
    name: "dob",
    LeftIcon: CalendarIcon,
    RightIcon: null,
    required: false,
    classes: "ps-[44px]",
    iconClass: "opacity-90",
  },
  {
    label: "Bio",
    placeholder: "Enter Bio Here",
    type: "textArea",
    name: "bio",
    LeftIcon: null,
    RightIcon: null,
    required: false,
    classes: "",
    iconClass: "",
  },
];

const EditProfile = () => {
  const data = useAppSelector((state) => state.profile);
  const dataQuery = useMutation({
    mutationFn: editProfile,
    onSuccess: (res) => {
      toast.success("profile updated.", {
        duration: 0,
        position: "bottom-center",
      });
    },
    onError: (error: any) => {
      toast.error(error.response.statusText, {
        duration: 0,
        position: "bottom-center",
      });
    },
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: EditProfileValidationSchema,
    onSubmit: (values: any) => {
      console.log(values);
      dataQuery.mutate(values);
    },
  });
  return (
    <>
      <Loading isLoading={dataQuery.isPending}>
        <SettingsHeader headerText={"Edit Profile"} showLogout={false} />
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-3 items-center p-4"
        >
          <div className="relative rounded-full w-fit">
            <Image
              src="https://picsum.photos/200/300"
              alt="user"
              width={150}
              height={150}
              className="rounded-full aspect-square"
            />
            <button className="absolute bottom-2 right-2 bg-primary rounded-full p-1 active:scale-[.97] border-[.5] border-white text-white">
              {DeleteIcon()}
            </button>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-[50%]">
              <Input
                {...formik.getFieldProps("first_name")}
                error={formik.errors.first_name}
                placeholder="First Name"
                type="text"
                required={false}
                label="First Name"
                classes=""
                iconClass=""
                LeftIcon={null}
                RightIcon={null}
              />
            </div>
            <div className="w-[50%]">
              <Input
                {...formik.getFieldProps("last_name")}
                error={formik.errors.last_name}
                placeholder="Last Name"
                type="text"
                required={false}
                label="Last Name"
                classes=""
                iconClass=""
                LeftIcon={null}
                RightIcon={null}
              />
            </div>
          </div>
          {fields.map((field, index) => (
            <Input
              key={index}
              {...formik.getFieldProps(field.name)}
              {...field}
              error={formik.errors[field.name as keyof typeof formik.errors]}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-2 active:scale-[.99] font-bold"
          >
            Save Changes
          </button>
        </form>
      </Loading>
    </>
  );
};

export default EditProfile;
