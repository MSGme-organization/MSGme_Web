import { response } from "@/api-modules/helpers/response";
import { generateToken } from "@/api-modules/helpers/token";
import { resetPasswordMail } from "@/api-modules/services/mail";
import { resetPassMailTemplate } from "@/api-modules/services/mailTemplate";
import redis from "@/app/redis";
import { emailFetch } from "@/utils/user_fetch";
import { randomInt } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
    if (!body.email) {
        return response.dataInvalid("email is required.");
    }
    const user = await emailFetch(body.email)
    if ((!user)) {
        return response.dataConflict("Invalid email.")
    }
    return user
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const user: any = await validateReq(body);
        cookies().set("otp_verify", generateToken({ id: user.id }))
        const otp = `${randomInt(9)}${randomInt(9)}${randomInt(9)}${randomInt(9)}`;
        await redis.set(user.id, otp, "EX", 600)
        console.log(await redis.get(user.id))
        const template = resetPassMailTemplate(body.email, "/set-password", otp)
        await resetPasswordMail(body.email, template)
        return response.success("Mail sent successfully.", null)
    } catch (error: any) {
        console.log(error)
        return response.error(error.message)
    }
};
