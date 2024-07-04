import toast from "react-hot-toast";

export const successToast = (message: string) => toast.success(message, {
  duration: 0,
  position: "bottom-center",
});

export const errorToast = (message: string) => toast.error(message || "Something went wrong!", {
  duration: 0,
  position: "bottom-center",
});