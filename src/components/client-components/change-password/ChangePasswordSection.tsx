import { changePassword } from "@/query/profile/changePass";
import {
  ChangePasswordInitialValues,
  ChangePasswordValidationSchema,
} from "@/utils/formik-validation";
import { LockIcon } from "@/utils/svgs";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Input from "../common-components/Input";
import Loading from "../loader/Loading";
import SettingsHeader from "../settings/SettingsHeader";

const inputArr = [
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
    placeholder: "Enter your old password",
    LeftIcon: LockIcon,
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your old password",
    LeftIcon: LockIcon,
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    type: "password",
    placeholder: "Enter your old password",
    LeftIcon: LockIcon,
  },
];

interface Props {
  handleActiveSection: (section: 0 | 1 | 2 | 3 | 4) => void;
}

const ChangePasswordSection: React.FC<Props> = ({ handleActiveSection }) => {
  const passwordQuery = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      successToast("Password changed successfully.");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });
  const formik = useFormik({
    initialValues: ChangePasswordInitialValues,
    validationSchema: ChangePasswordValidationSchema,
    onSubmit: (values) => {
      passwordQuery.mutate(values);
    },
  });

  const handleGoBack = () => handleActiveSection(2);

  return (
    <>
      <Loading isLoading={passwordQuery.isPending}>
        <SettingsHeader
          handleGoBack={handleGoBack}
          headerText={"Change Password"}
          showLogout={false}
        />
        <form
          className="p-4 flex flex-col gap-2"
          onSubmit={formik.handleSubmit}
        >
          {inputArr.map((input, index) => (
            <Input
              {...formik.getFieldMeta(input.name)}
              {...formik.getFieldProps(input.name)}
              error={formik.errors[input.name as keyof typeof formik.errors]}
              key={index}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              LeftIcon={input.LeftIcon}
              required
              classes="ps-[44px]"
              iconClass=""
              RightIcon={null}
            />
          ))}
          <button
            type="submit"
            className="mt-4 text-white font-semibold bg-primary p-3 rounded-lg active:scale-[.99]"
          >
            Change Password
          </button>
        </form>
      </Loading>
    </>
  );
};

export default ChangePasswordSection;
