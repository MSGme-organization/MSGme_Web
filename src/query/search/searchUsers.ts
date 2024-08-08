import axios from "axios";

export const searchUsers = async (search: string) => {
  const response = await axios.get("/api/v1/search-users", {
    params: { search: search },
  });
  return response;
};
