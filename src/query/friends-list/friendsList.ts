import axios from "axios";

export const fetchFriendsList = async () => {
  const response = await axios.get("/api/v1/get-friends");
  return response;
};
