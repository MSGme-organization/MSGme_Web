"use client";

import { createContext, ReactNode, useContext } from "react";

const ProfileContext = createContext({});
type ProfileProviderProps = {
  children: ReactNode;
  step: number;
  setStep: (step: number) => void;
};

export const ProfileProvider = ({
  children,
  step,
  setStep,
}: ProfileProviderProps) => {
  return (
    <ProfileContext.Provider value={{ step, setStep }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
