"use server";

import { decodedToken, generateToken } from "@/api-modules/helpers/token";
import { resetPasswordMail } from "@/api-modules/services/mail";
import resetPassMailTemplate from "@/api-modules/services/mailTemplate";
import redis from "@/app/redis";
import { randomInt } from "crypto";
import { cookies } from "next/headers";

export const otpVerify = async (userOtp: string) => {
  const token = await decodedToken(cookies().get("otp_verify")?.value);
  const otp = await redis.get(token.otpId);
  console.log(otp)
  if (otp) {
    if (otp == userOtp) {
      await redis.del(token.otpId);
      cookies().delete("otp_verify");
      cookies().set("set-pass", generateToken({ userId: token.userId }), {
        expires: new Date(Date.now() + 600000),
      });
      return true;
    } else {
      return Error("Otp invalid.");
    }
  } else {
    return Error("Otp not found.");
  }
};

export const resendOtp = async () => {
  try {
    const decoded = decodedToken(cookies().get("otp_verify")?.value);
    const otp = `${randomInt(9)}${randomInt(9)}${randomInt(9)}${randomInt(9)}`;
    const template = resetPassMailTemplate(decoded.emailId, otp);
    await resetPasswordMail(decoded.emailId, template);
    await redis.set(decoded.otpId, otp, "EX", 600);
    return "Otp sent successfully";
  } catch (err) {
    throw err;
  }
};
