import axios from "axios";

interface paramsInterface {
  search: string;
  searchType: string;
}

export const searchUsers = async (params: paramsInterface) => {
  const response = await axios.get("/api/v1/search-users", {
    params,
  });
  return response;
};
