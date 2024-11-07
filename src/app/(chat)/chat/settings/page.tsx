"use client";

import Loading from "@/components/loader/Loading";
import ShareModal from "@/components/modals/ShareModal";
import ProfileSection from "@/components/settings/ProfileSection";
import SettingItem from "@/components/settings/SettingItem";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { logout } from "@/query/auth/auth";
import {
  ChangePassIcon,
  HelpIcon,
  InfoIcon,
  LanguageIcon,
  MoonIcon,
  PrivacyIcon,
  ShareIcon,
  StartIcon,
  SunIcon,
} from "@/utils/svgs";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useThemeMode } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const Settings = () => {
  const [shareModel, setShareModel] = React.useState(false);
  const router = useRouter();
  const theme = useThemeMode();
  const logoutQuery = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      successToast("Logged out successfully")
      router.push("/login");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message)
    },
  });

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
      fn: () => { },
    },
    {
      label: "Change Language",
      showArrow: true,
      icon: LanguageIcon,
      fn: () => { },
    },
    {
      label: "Change Theme",
      showArrow: false,
      icon: theme.computedMode === "light" ? SunIcon : MoonIcon,
      fn: () => theme.toggleMode(),
    },
    {
      label: "Share Profile",
      icon: ShareIcon,
      fn: () => setShareModel(true),
    },
    {
      label: "Help & Support",
      icon: HelpIcon,
      fn: () => { },
    },
    {
      label: "Privacy Policy",
      icon: PrivacyIcon,
      fn: () => { },
    },
    {
      label: "Version 1.0.0",
      icon: InfoIcon,
      fn: () => { },
    },
  ];

  return (
    <>
      <Loading isLoading={logoutQuery.isPending}>
        <SettingsHeader
          headerText={"Settings"}
          logout={logoutQuery}
          showLogout
        />
        <ProfileSection />
        <section className="w-full py-3 border-b border-gray-200 dark:border-gray-800">
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
      </Loading>
    </>
  );
};

export default Settings;
