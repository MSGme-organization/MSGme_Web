"use client";

import Loading from "@/components/client-components/loader/Loading";
import CustomOtpInput from "@/components/client-components/otp/CustomOtpInput";
import { otpVerify, resendOtp } from "@/query/auth/otp";
import { errorToast, successToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React from "react";

const Otp = () => {
  const router = useRouter();
  const [OTP, setOTP] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const result = await otpVerify(OTP);
      if (result) {
        setLoading(false);
        router.replace("/set-password");
      } else {
        setLoading(false);
        errorToast("Invalid OTP!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      errorToast(error.message);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const msg = await resendOtp();
      successToast(msg);
    } catch (error) {
      errorToast("Failed to resend OTP!");
    }
    setLoading(false);
  };
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
            <CustomOtpInput length={4} otp={OTP} onChange={setOTP} />
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
              <button onClick={handleResend}>
                <span className="font-semibold text-primary cursor-pointer">
                  Resend it
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Otp;
