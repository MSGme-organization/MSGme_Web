import axios from "axios";

interface paramsInterface {
  search: string;
  searchType: string;
}

interface friendRequestInterface {
  receiverId: string;
  requestStatus: "sent" | "unSent";
}

interface friendRequestResponseInterface {
  receiverId: string;
  requestResponse: "0" | "1";
}

export const searchUsers = async (params: paramsInterface) => {
  const response = await axios.get("/api/v1/search-users", {
    params,
  });
  return response;
};

export const friendRequest = async (payload: friendRequestInterface) => {
  const response = await axios.post("/api/v1/send-request", payload);
  return response;
};

export const friendRequestResponse = async (
  payload: friendRequestResponseInterface
) => {
  const response = await axios.post("/api/v1/request-response", payload);
  return response;
};
