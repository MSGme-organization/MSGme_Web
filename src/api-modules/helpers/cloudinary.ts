import cloudinary from "../config/cloudinary";

export const uploadCloudinary = (data) => {
  return cloudinary.v2.uploader.upload_large(`data:image/png;base64,${data}`, {
    folder: "MSGme",
  });
};
