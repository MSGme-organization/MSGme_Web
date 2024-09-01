"use server";

import { decodedToken, generateToken } from "@/utils/helpers/token";
import { resetPasswordMail } from "@/utils/mail-services/mail";
import resetPassMailTemplate from "@/utils/mail-services/mailTemplate";
import redis from "@/lib/redis/redis";
import { randomInt } from "crypto";
import { cookies } from "next/headers";

export const otpVerify = async (userOtp: string) => {
  const token: any = decodedToken(cookies().get("otp_verify")?.value as string);
  await redis.connect();
  const otp = await redis.get(token.otpId);
  if (otp) {
    if (otp == userOtp) {
      await redis.del(token.otpId);
      cookies().delete("otp_verify");
      cookies().set("set-pass", await generateToken({ userId: token.userId }), {
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
    const decoded: any = decodedToken(
      cookies().get("otp_verify")?.value as string
    );
    const otp = `${randomInt(9)}${randomInt(9)}${randomInt(9)}${randomInt(9)}`;
    const template = resetPassMailTemplate(decoded.emailId, otp);
    await resetPasswordMail(decoded.emailId, template);
    await redis.connect();
    await redis.set(decoded.otpId, otp, { EX: 600 });
    return "Otp sent successfully";
  } catch (err) {
    throw err;
  }
};
