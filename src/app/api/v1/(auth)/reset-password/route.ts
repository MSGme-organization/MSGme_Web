import { response } from "@/api-modules/helpers/response";
import { generateToken } from "@/api-modules/helpers/token";
import { resetPasswordMail } from "@/api-modules/services/mail";
import { resetPassMailTemplate } from "@/api-modules/services/mailTemplate";
import redis from "@/app/redis";
import { emailFetch } from "@/utils/user_fetch";
import { randomInt, randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  if (!body.email) {
    return response.dataInvalid("email is required.");
  }
  return null
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validationError = await validateReq(body);
    if (validationError) {
      return validationError
    }

    const user: any = await emailFetch(body.email);

    if (!user) {
      return response.dataConflict("Invalid email.");
    }

    const otpId = randomUUID();
    const otp = `${randomInt(9)}${randomInt(9)}${randomInt(9)}${randomInt(9)}`;
    const template = resetPassMailTemplate(body.email, otp);
    await redis.connect()
    await resetPasswordMail(body.email, template);
    if (await redis.get(otpId)) {
      await redis.del(otpId);
    }
    await redis.set(otpId, otp, { "EX": 600 });
    cookies().set(
      "otp_verify",
      generateToken({ otpId, userId: user.id, emailId: user.email }),
      { expires: new Date(Date.now() + 600000) }
    );
    return response.success("Mail sent successfully.", null);
  } catch (error: any) {
    return response.error(error.message);
  }
};
