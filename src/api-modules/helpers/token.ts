import jwt from "jsonwebtoken";

export const generateToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

export const verifyToken = (data: any) => {
  return jwt.verify(data, process.env.JWT_SECRET);
};

export const decodedToken = (data: any) => {
  return jwt.decode(data, process.env.JWT_SECRET);
};
