"use client";

import "react-step-progress-bar/styles.css";

import { ProfileProvider } from "@/components/context/ProfileContext";
import { useAppDispatch } from "@/lib/redux/hooks";
import { fetchProfile } from "@/lib/redux/profile/profileSlice";
import { CheckCircle } from "@/utils/svgs";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [step, setStep] = useState(0);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <>

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
       
    </>
  );
}
