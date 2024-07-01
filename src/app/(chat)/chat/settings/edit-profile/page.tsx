"use client";

import Input from "@/components/client-components/common-components/Input";
import SettingsHeader from "@/components/client-components/settings/SettingsHeader";
import {
  EditProfileInitialValues,
  EditProfileValidationSchema,
} from "@/utils/formik-validation";
import { CalendarIcon, DeleteIcon, EmailIcon, UserIcon } from "@/utils/svgs";
import { useFormik } from "formik";
import Image from "next/image";

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
  const formik = useFormik({
    initialValues: EditProfileInitialValues,
    validationSchema: EditProfileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
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
              {...formik.getFieldProps("firstName")}
              error={formik.errors.firstName}
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
              {...formik.getFieldProps("lastName")}
              error={formik.errors.lastName}
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
        {fields.map((field) => (
          <Input
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
    </>
  );
};

export default EditProfile;
