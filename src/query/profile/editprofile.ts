import axios from "axios";

export const editProfile = async (data: any) => {
  const response = await axios.post("/api/v1/edit-profile", data);
  return response;
};
