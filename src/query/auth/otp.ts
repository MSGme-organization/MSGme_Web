"use server"

import redis from "@/app/redis"
import { cookies } from "next/headers"

export const otpVerify = async (userOtp: string) => {
    console.log(cookies().get("otp_verify")?.value)
    const otp = await redis.get(cookies().get("otp_verify")?.value.id as string)
    if (otp) {
        if (otp == userOtp) {
            return true
        } else {
            return false
        }
    } else {
        throw Error("Otp not found.")
    }
}
