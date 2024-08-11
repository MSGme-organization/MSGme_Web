import axios from "axios";

export const getInvitations = async () => {
  const response = await axios.get("/api/v1/get-invitations");
  return response;
};
