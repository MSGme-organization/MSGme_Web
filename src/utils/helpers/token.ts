import { jwtVerify, SignJWT, decodeJwt } from "jose";

export type DecodedUserType = {
  id: string;
  username: string;
  email: string;
};

export const generateToken = async (data: any) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  return new SignJWT(data).setProtectedHeader({ alg: "HS256" }).sign(secret);
};

export const verifyToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const decodedToken = (token: string): DecodedUserType => {
  return decodeJwt(token);
};
