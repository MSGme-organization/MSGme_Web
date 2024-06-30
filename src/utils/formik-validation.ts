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
  currentPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/,
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character"
    )
    .required("Current Password is required"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/,
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character"
    )
    .required("New Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm New Password is required"),
});

export const LoginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/,
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character"
    )
    .required("Required"),
});

export const EmailValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const SetPassword = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/,
      "Enter strong password"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
});

export const RegisterValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/,
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character"
    )
    .required("Required"),
  userName: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
});
