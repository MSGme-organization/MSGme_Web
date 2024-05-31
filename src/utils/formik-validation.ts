import * as Yup from "yup";

export const EditProfileInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
};

export const ChangePasswordInitialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const EditProfileValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bio: Yup.string().required("Bio is required"),
});

export const ChangePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm New Password is required"),
});
