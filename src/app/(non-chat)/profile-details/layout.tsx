"use client";
// @ts-ignore
import "react-step-progress-bar/styles.css";

import { ProgressBar, Step } from "react-step-progress-bar";
import { CheckCircle } from "@/utils/svgs";
import { useState } from "react";
import { Inter } from "next/font/google";
import { ProfileProvider } from "@/components/client-components/profile-setup/ProfileContext";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [step, setStep] = useState(0);

  return (
    <>
      <div className="flex justify-center w-[100%] h-[100%] mt-28 mb-20">
        <div className="bg-bgColor dark:bg-customGrey-black text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
          <div className="px-4 mt-3">
            <ProgressBar
              percent={(step * 100) / 2}
              height={3}
              unfilledBackground="#96A1AF"
              filledBackground="#38C585"
            >
              <Step>
                {({ accomplished, index }) => {
                  return accomplished ? (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : "font-semibold"
                      } `}
                    >
                      {CheckCircle()}
                    </div>
                  ) : (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : "font-semibold"
                      } `}
                    >
                      {index + 1}
                    </div>
                  );
                }}
              </Step>
              <Step>
                {({ accomplished, index }) =>
                  accomplished ? (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : "font-semibold"
                      } `}
                    >
                      {CheckCircle()}
                    </div>
                  ) : (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : "font-semibold"
                      }`}
                    >
                      {index + 1}
                    </div>
                  )
                }
              </Step>
              <Step>
                {({ accomplished, index }) =>
                  accomplished ? (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : "font-semibold"
                      } `}
                    >
                      {CheckCircle()}
                    </div>
                  ) : (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : "font-semibold"
                      }`}
                    >
                      {index + 1}
                    </div>
                  )
                }
              </Step>
            </ProgressBar>
          </div>
          <ProfileProvider step={step} setStep={setStep}>
            <div className={inter.className}>{children}</div>
          </ProfileProvider>
        </div>
      </div>
    </>
  );
}
