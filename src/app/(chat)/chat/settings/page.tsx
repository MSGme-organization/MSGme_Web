"use client";

import ShareModal from "@/components/client-components/modals/ShareModal";
import ProfileSection from "@/components/client-components/settings/ProfileSection";
import SettingItem from "@/components/client-components/settings/SettingItem";
import SettingsHeader from "@/components/client-components/settings/SettingsHeader";
import {
  ChangePassIcon,
  HelpIcon,
  InfoIcon,
  LanguageIcon,
  MoonIcon,
  PrivacyIcon,
  ShareIcon,
  StartIcon,
} from "@/utils/svgs";
import { useRouter } from "next/navigation";
import React from "react";

const Settings = () => {
  const [shareModel, setShareModel] = React.useState(false);
  const router = useRouter();

  const settingItems = [
    {
      label: "Change Password",
      icon: ChangePassIcon,
      showArrow: true,
      fn: () => router.push("/chat/settings/change-password"),
    },
    {
      label: "Review",
      showArrow: true,
      icon: StartIcon,
      fn: () => {},
    },
    {
      label: "Change Theme",
      showArrow: true,
      icon: MoonIcon,
      fn: () => {},
    },
    {
      label: "Change Language",
      showArrow: true,
      icon: LanguageIcon,
      fn: () => {},
    },
    {
      label: "Share Profile",
      icon: ShareIcon,
      fn: () => setShareModel(true),
    },
    {
      label: "Help & Support",
      icon: HelpIcon,
      fn: () => {},
    },
    {
      label: "Privacy Policy",
      icon: PrivacyIcon,
      fn: () => {},
    },
    {
      label: "Version 1.0.0",
      icon: InfoIcon,
      fn: () => {},
    },
  ];

  return (
    <>
      <div className="w-full h-full overflow-y-scroll md:w-[25%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white">
        <SettingsHeader headerText={"Settings"} showLogout />
        <ProfileSection />
        <section className="w-full py-3 border-b border-gray-200 ">
          {settingItems.map((item, index) => (
            <SettingItem key={index} {...item} />
          ))}
        </section>
        <section></section>
        <ShareModal
          shareUrl="www.google.com"
          setOpenModal={setShareModel}
          openModal={shareModel}
        />
      </div>
    </>
  );
};

export default Settings;
