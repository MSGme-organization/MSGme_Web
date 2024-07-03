import axios from "axios";

export const getProfile = async () => {
  const response = await axios.get("/api/v1/get-profile");
  return response;
};
