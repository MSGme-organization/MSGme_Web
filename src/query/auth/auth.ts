import axios from "axios";

export const register = async ({
  email,
  userName,
  password,
}: {
  email: string;
  userName: string;
  password: string;
}) => {
  const response = await axios.post("/api/v1/register", {
    email,
    username: userName,
    password,
  });
  return response;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/v1/login", {
    email,
    password,
  });
  return response;
};

export const logout = async () => {
  const response = await axios.post("/api/v1/logout");
  return response;
};
