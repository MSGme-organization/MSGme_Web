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
import Loading from "../loader/Loading";
import ShareModal from "../modals/ShareModal";
import ProfileSection from "./ProfileSection";
import SettingItem from "./SettingItem";
import SettingsHeader from "./SettingsHeader";

interface Props {
  handleActiveSection: (section: 0 | 1 | 2 | 3 | 4) => void;
}

const SettingSection: React.FC<Props> = ({ handleActiveSection }) => {
  const [shareModel, setShareModel] = React.useState(false);
  const router = useRouter();
  const theme = useThemeMode();
  const logoutQuery = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      successToast("Logged out successfully");
      router.push("/login");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });

  const settingItems = React.useMemo(
    () => [
      {
        label: "Change Password",
        icon: ChangePassIcon,
        showArrow: true,
        fn: () => handleActiveSection(4),
      },
      {
        label: "Review",
        showArrow: true,
        icon: StartIcon,
        fn: () => {},
      },
      {
        label: "Change Language",
        showArrow: true,
        icon: LanguageIcon,
        fn: () => {},
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
    ],
    []
  );

  const handleGoBack = () => handleActiveSection(0);

  return (
    <>
      <Loading isLoading={logoutQuery.isPending}>
        <SettingsHeader
          handleGoBack={handleGoBack}
          headerText={"Settings"}
          logout={logoutQuery}
          showLogout
        />
        <ProfileSection handleActiveSection={handleActiveSection} />
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

export default SettingSection;
