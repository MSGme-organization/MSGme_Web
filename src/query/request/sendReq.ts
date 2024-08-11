import axios from "axios";

export const sendRequest = async (body: object = {}) => {
  const response = await axios.post("/api/v1/send-request", body);
  return response;
};
