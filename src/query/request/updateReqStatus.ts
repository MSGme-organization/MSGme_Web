import axios from "axios";

export const updateReqStatus = async (data: any) => {
  const response = await axios.put("/api/v1/update-request-status", data);
  return response;
};
