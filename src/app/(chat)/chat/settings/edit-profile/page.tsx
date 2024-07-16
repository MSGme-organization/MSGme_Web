"use client";

import Input from "@/components/client-components/common-components/Input";
import Loading from "@/components/client-components/loader/Loading";
import SettingsHeader from "@/components/client-components/settings/SettingsHeader";
import { editProfile } from "@/query/profile/editprofile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfileData } from "@/redux/profile/profileSlice";
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
  const [imageData, setImageData] = React.useState(null);
  const data = useAppSelector((state) => state.profile);
  const ref = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const dataQuery = useMutation({
    mutationFn: editProfile,
    onSuccess: (res: any) => {
      dispatch(updateProfileData(res.data.data));
      successToast("profile updated.");
    },
    onError: (error: any) => {
      errorToast(error.response.statusText);
    },
  });

  const handleSubmit = (values: any) => {
    if (imageData) {
      const fr = new FileReader();
      fr.onload = function (event: any) {
        const base64String = event.target.result.split(",")[1];
        dataQuery.mutate({ ...values, avatar: base64String });
      };
      fr.onerror = function (event: any) {
        console.error(
          "File could not be read! Code " + event.target.error.code
        );
      };
      fr.readAsDataURL(imageData as Blob);
    } else {
      dataQuery.mutate(values);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...data, dob: formatDate(data.dob) },
    validationSchema: EditProfileValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleProfile = () => {
    ref.current?.click();
  };

  const handleFile = (event: any) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    formik.setFieldValue("avatar", imageUrl);
    setImageData(imageFile);
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
              src={formik.values.avatar || "MSGme/default_profile"}
              alt="profile image"
              className="rounded-full aspect-square object-contain"
            />
            <input
              type="file"
              className="hidden"
              ref={ref}
              onChange={handleFile}
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
                {...formik.getFieldProps("first_name")}
                error={formik.errors.first_name as string}
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
                error={formik.errors.last_name as string}
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
              error={formik.errors[field.name] as string}
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
