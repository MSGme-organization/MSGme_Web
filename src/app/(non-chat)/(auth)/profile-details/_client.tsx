"use client";

import AddProfilePhoto from "@/components/profile-setup/AddProfilePhoto";
import DOB from "@/components/profile-setup/DOB";
import FullName from "@/components/profile-setup/FullName";
import { useProfile } from "@/components/context/ProfileContext";

type PageContext = {
  setStep: (step: number) => void;
  step: number;
};

const ProfileDetails = () => {
  const handleIncrement = () => {
    setStep(step + 1);
  };
  const handleDecrement = () => {
    setStep(step - 1);
  };
  const { setStep, step } = useProfile() as PageContext;
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
    return <AddProfilePhoto handleDecrement={handleDecrement} />;
  }
};

export default ProfileDetails;
