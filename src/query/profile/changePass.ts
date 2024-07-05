import axios from "axios";

export const changePassword = async (value: any) => {
  const res = await axios.post("/api/v1/change-password", value);
  return res;
};
