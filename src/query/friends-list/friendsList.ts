import axios from "axios";

export const fetchChatList = async () => {
  const response = await axios.get("/api/v1/get-friends");
  return response;
};
