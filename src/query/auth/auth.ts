import { generateAndExportKeyPair } from "@/utils/messageE2EE";
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
  try {
    const { publicKey, privateKey } = await generateAndExportKeyPair();
    const response = await axios.post("/api/v1/register", {
      email,
      username: userName,
      password,
      public_key: publicKey,
    });
    localStorage.setItem("private_key", JSON.stringify(privateKey));
    return response;
  } catch (error) {
    throw error;
  }
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

export const resetPassword = async (value: any) => {
  const response = await axios.post("/api/v1/reset-password", value);
  return response;
};

export const setPassword = async (value: any) => {
  const response = await axios.post("/api/v1/set-password", value);
  return response;
};
