"use client";
import React, { useContext } from "react";
import { PageContext } from "./layout";
import FullName from "@/components/client-components/profile-setup/FullName";
import DOB from "@/components/client-components/profile-setup/DOB";
import AddProfilePhoto from "@/components/client-components/profile-setup/AddProfilePhoto";

type PageContext = {
  setStep: (step: number) => void;
  step: number;
};

const ProfileDetails = () => {
  const handleIncrement = () => {
    setStep(step + 1);
  };
  const handleDecrement = () => {
    console.log(1)
    setStep(step - 1);
  };
  const { setStep, step } = useContext(PageContext) as PageContext;
  if (step === 0) {
    return <FullName handleIncrement={handleIncrement} />;
  } else if (step === 1) {
    return (
      <DOB
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    );
  } else {
    return (
      <AddProfilePhoto
        handleDecrement={handleDecrement}
      />
    );
  }
};

export default ProfileDetails;
