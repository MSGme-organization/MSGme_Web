"use client";

import Loading from "@/components/client-components/loader/Loading";
import { otpVerify } from "@/query/auth/otp";
import { errorToast } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "otp-input-react";
import React from "react";

const Otp = () => {
    const router = useRouter()
    const [OTP, setOTP] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleVerify = async () => {
        setLoading(true)
        try {
            const result = await otpVerify(OTP)
            if (result) {
                setLoading(false)
                router.replace("/set-password")
            } else {
                setLoading(false)
                errorToast("Invalid OTP!")
            }
        } catch (error) {
            setLoading(false)
            errorToast("Otp is Expired or not Found!")
        }
    }

    return (
        <Loading isLoading={loading}>
            <div className="flex justify-center w-[100%] h-[100%] mt-28  mb-20">
                <div className="bg-bgColor dark:bg-customGrey-black text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
                    <div className="text-center">
                        <p className="font-extrabold text-[24px] mt-3">Verify OTP</p>
                        <p className="text-[14px] mt-3 font-medium">
                            OTP has been sent to your Mail Id
                        </p>
                    </div>
                    <div className="flex justify-center mt-8">
                        <OTPInput value={OTP} onChange={setOTP} className="flex justify-between w-[80%] min-w-[225px] " inputStyles={{ width: "20%", maxWidth: "150px", minWidth: "50px", margin: 0 }} inputClassName="m-0 py-[30px] rounded bg-bgColor dark:bg-customGrey-black text-textColor dark:text-textColor-dark focus:ring-0 focus:border-primary text-[20px]" autoFocus OTPLength={4} otpType="number" disabled={false} />
                    </div>
                    <div className="mb-5 mt-8">
                        <button
                            disabled={OTP.length !== 4}
                            onClick={handleVerify}
                            type="submit"
                            className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%]"
                        >
                            Verify
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-[14px] mt-3 font-medium">
                            Not received?{" "}
                            <Link href="/login">
                                <span className="font-semibold text-primary cursor-pointer">
                                    Resend it
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div></Loading>
    );
};

export default Otp;
