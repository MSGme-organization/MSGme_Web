import crypto from "crypto";

const api_sign_request = (params_to_sign, api_secret) => {
  const to_sign = Object.keys(params_to_sign)
    .filter((key) => params_to_sign[key] != null)
    .sort()
    .map(
      (key) =>
        `${key}=${
          Array.isArray(params_to_sign[key])
            ? params_to_sign[key].join(",")
            : params_to_sign[key]
        }`
    )
    .join("&");

  const shasum = crypto.createHash("sha1");
  shasum.update(Buffer.from(to_sign + api_secret, "utf8").toString("binary"));
  return shasum.digest("hex");
};

export const uploadCloudinaryImage = async (file: File) => {
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("folder", "MSGme");
  formdata.append(
    "upload_preset",
    String(process.env.CLOUDINARY_UPLOAD_PRESET)
  );
  formdata.append("api_key", String(process.env.CLOUDINARY_API_KEY));
  formdata.append("timestamp", String(Date.now()));
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formdata,
    }
  );
  return res.json();
};

export const deleteCloudinaryImage = async (public_id: any) => {
  const formdata = new FormData();
  formdata.append("public_id", public_id);
  const timestamp = Date.now();
  formdata.append("api_key", String(process.env.CLOUDINARY_API_KEY));
  formdata.append("timestamp", String(timestamp));
  formdata.append(
    "signature",
    api_sign_request(
      { public_id, timestamp },
      process.env.CLOUDINARY_API_SECRET
    )
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: "POST",
      body: formdata,
    }
  );
  return res.json();
};
