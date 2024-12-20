"use client";

import Input from "@/components/common-components/Input";
import Loading from "@/components/loader/Loading";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { editProfile } from "@/query/profile/editprofile";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateProfileData } from "@/lib/redux/profile/profileSlice";
import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { formatDate } from "@/utils/date";
import { EditProfileValidationSchema } from "@/utils/formik-validation";
import { CalendarIcon, EmailIcon, PencilIcon, UserIcon } from "@/utils/svgs";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CldImage } from "next-cloudinary";
import React from "react";

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
  const data = useAppSelector((state) => state.profile) 
  const ref = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: any, props: any) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "avatar") {
        if (values.avatar?.url !== data.avatar?.url) {
          formData.append("avatar", values.avatar.file);
        }
      } else if (key === "dob") {
        if (values.dob === formatDate(data.dob as string)) {
          formData.delete("dob");
        }
      } else {
        values[key] !== data[key] && formData.append(key, values[key]);
      }
    });

    dataQuery.mutate(formData);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...data, dob: formatDate(data?.dob as string) },
    validationSchema: EditProfileValidationSchema,
    onSubmit: handleSubmit,
  });

  const dataQuery = useMutation({
    mutationFn: editProfile,
    onSuccess: (res: any) => {
      dispatch(updateProfileData(res.data.data));
      successToast("profile updated.");
    },
    onError: (error: any) => {
      error.response.data.data && formik.setErrors(error.response.data.data);
      errorToast(error.response.statusText);
    },
  });

  const handleProfile = () => {
    ref.current?.click();
  };

  const handleFile = (event: any) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    formik.setFieldValue("avatar", { file: imageFile, url: imageUrl });
    formik.setFieldTouched("avatar", true);
  };

  return (
    <>
      <Loading isLoading={dataQuery.isPending}>
        <SettingsHeader headerText={"Edit Profile"} showLogout={false} />
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-3 items-center p-4"
        >
          <div className="relative rounded-full w-fit">
            <CldImage
              width={150}
              height={150}
              src={formik.values.avatar?.url || DEFAULT_PROFILE_IMG}
              alt="profile image"
              className="rounded-full aspect-square object-contain"
            />
            <input
              type="file"
              className="hidden"
              ref={ref}
              onChange={handleFile}
              multiple={false}
              accept="image/*"
            />
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-primary rounded-full p-1 active:scale-[.97] border-[.5] border-white text-white h-[30px] w-[30px]"
              onClick={handleProfile}
            >
              {PencilIcon()}
            </button>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-[50%]">
              <Input
                {...formik.getFieldMeta("firstName")}
                {...formik.getFieldProps("firstName")}
                error={formik.errors.firstName as string}
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
                {...formik.getFieldMeta("lastName")}
                {...formik.getFieldProps("lastName")}
                error={formik.errors.lastName as string}
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
              {...formik.getFieldMeta(field.name)}
              {...field}
              error={formik.errors[field.name] as string}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-2 active:scale-[.99] font-bold"
            disabled={Object.keys(formik.touched).length <= 0}
          >
            Save Changes
          </button>
        </form>
      </Loading>
    </>
  );
};

export default EditProfile;
