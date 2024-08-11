import axios from "axios";

const modes: object = {
  normal: 1,
  request: 2,
};

export const searchUsersForReq = async (search: string) => {
  const response = await axios.get("/api/v1/search-users", {
    params: { search: search, mode: modes["request"] },
  });
  return response;
};

export const searchUsers = async (search: string) => {
  const response = await axios.get("/api/v1/search-users", {
    params: { search: search, mode: modes["normal"] },
  });
  return response;
};
