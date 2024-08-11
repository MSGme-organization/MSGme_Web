"use client";

import Spinner from "@/components/client-components/placeholder/Spinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

const ChatSection = dynamic(
  () => import("@/components/client-components/chat-list/ChatSection"),
  { ssr: false, loading: Spinner }
);
const DefaultSection = dynamic(
  () => import("@/components/client-components/chat/DefaultSection"),
  { ssr: false, loading: Spinner }
);
const MsgSection = dynamic(
  () => import("@/components/client-components/chat/MsgSection"),
  { ssr: false, loading: Spinner }
);

const RequestSection = dynamic(
  () => import("@/components/client-components/request-list/RequestSection"),
  { ssr: false, loading: Spinner }
);

const SettingSection = dynamic(
  () => import("@/components/client-components/settings/SettingSection"),
  { ssr: false, loading: Spinner }
);
const EditProfileSection = dynamic(
  () =>
    import("@/components/client-components/edit-profile/EditProfileSection"),
  { ssr: false, loading: Spinner }
);
const ChangePasswordSection = dynamic(
  () =>
    import(
      "@/components/client-components/change-password/ChangePasswordSection"
    ),
  { ssr: false, loading: Spinner }
);

const Chat = () => {
  const [activeSection, setActiveSection] = React.useState<0 | 1 | 2 | 3 | 4>(
    0
  );
  const [activeChat, setActiveChat] = React.useState<number | null>(null);
  const [screenWidth, setScreenWidth] = React.useState<number | null>(null);
  const router = useRouter();

  const handleNavigation = React.useCallback(
    (path: string, state: object = {}) => {
      router.push(path, state);
    },
    []
  );

  const handleActiveSection = React.useCallback(
    (section: 0 | 1 | 2 | 3 | 4) => {
      setActiveSection(section);
    },
    []
  );

  const handleActiveChat = React.useCallback((chatID: number | null) => {
    setActiveChat(chatID);
  }, []);

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const showSection = React.useCallback(() => {
    switch (activeSection) {
      case 0:
        return (
          <ChatSection
            handleActiveChat={handleActiveChat}
            handleActiveSection={handleActiveSection}
            handleNavigation={handleNavigation}
            activeChat={activeChat}
          />
        );
      case 1:
        return <RequestSection handleActiveSection={handleActiveSection} />;
      case 2:
        return <SettingSection handleActiveSection={handleActiveSection} />;
      case 3:
        return <EditProfileSection handleActiveSection={handleActiveSection} />;
      case 4:
        return (
          <ChangePasswordSection handleActiveSection={handleActiveSection} />
        );
      default:
        return (
          <ChatSection
            handleActiveChat={handleActiveChat}
            handleActiveSection={handleActiveSection}
            handleNavigation={handleNavigation}
            activeChat={activeChat}
          />
        );
    }
  }, [activeSection]);

  return screenWidth && screenWidth > 768 ? (
    <>
      <div className="w-full h-full overflow-y-scroll md:w-[20%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white">
        {showSection()}
      </div>
      <div
        className={`flex-grow ${
          activeChat ? "" : "hidden"
        }  h-full  bg-[#E9ECEF] dark:bg-customGrey-black md:block`}
      >
        {activeChat ? (
          <MsgSection activeChat={activeChat} />
        ) : (
          <DefaultSection />
        )}
      </div>
    </>
  ) : activeChat ? (
    <div
      className={`flex-grow ${
        activeChat ? "" : "hidden"
      }  h-full  bg-[#E9ECEF] dark:bg-customGrey-black md:block`}
    >
      {activeChat ? <MsgSection activeChat={activeChat} /> : <DefaultSection />}
    </div>
  ) : (
    <div className="w-full h-full overflow-y-scroll md:w-[20%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white">
      {showSection()}
    </div>
  );
};

export default Chat;
