import { randomUUID } from "crypto";
import cloudinary from "../config/cloudinary";

export const uploadCloudinary = async (data: any) => {
  const res = await cloudinary.v2.uploader.upload_large(`data:image/png;base64,${data}`, {
    folder: "MSGme",
    public_id: randomUUID()
  })
  return res
};

export const deleteCloudinary = async (public_id: any) => {
  console.log(public_id)
  const res = cloudinary.v2.uploader.destroy(public_id, {
    resource_type: "image",
    type: "upload"
  });
  return res
};
