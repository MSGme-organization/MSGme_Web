"use client";
// @ts-ignore
import "react-step-progress-bar/styles.css";

import { ProgressBar, Step } from "react-step-progress-bar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center w-[100%] h-[100%] mt-28 mb-20">
        <div className="bg-bgColor dark:bg-customGrey-dark text-textColor dark:text-textColor-dark max-w-[593px] w-[100%] p-8 rounded-[20px]">
          <ProgressBar percent={100}>
            <Step>
              {({ accomplished, index }) => (
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : ""
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
            <Step>
              {({ accomplished, index }) => (
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : ""
                  } bg-bgColor dark:bg-customGrey-black `}
                >
                  {index + 1}
                </div>
              )}
            </Step>
            <Step>
              {({ accomplished, index }) => (
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : ""
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
          </ProgressBar>
          {children}
        </div>
      </div>
    </>
  );
}
