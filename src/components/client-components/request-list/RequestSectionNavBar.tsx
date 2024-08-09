import { BackIcon } from "@/utils/svgs";
import React from "react";

interface Props {
  handleNavigation: (path: string) => void;
  swichSection: (section: 0 | 1) => void;
  activeSection: 0 | 1;
  handleActiveSection: (section: 0 | 1) => void;
}

const RequestSectionNavBar: React.FC<Props> = ({
  swichSection,
  activeSection,
  handleActiveSection,
}) => {
  const sections = React.useMemo(
    () => [
      {
        id: 0,
        name: "Send Request",
        onClick: () => swichSection(0),
      },
      {
        id: 1,
        name: "Invitations",
        onClick: () => swichSection(1),
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full flex bg-bgColor dark:bg-customGrey-black justify-center items-center p-4 h-[70px] sticky top-0 left-0">
        <div className="flex gap-2 absolute start-4">
          <button
            className="rounded-full bg-gray-50  p-2 flex justify-center items-center  active:scale-[.97] dark:bg-gray-700"
            onClick={() => handleActiveSection(0)}
          >
            {BackIcon()}
          </button>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-200 dark:bg-bgColor-dark flex rounded-full">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`${
                  activeSection === section.id
                    ? "bg-primary text-white"
                    : "text-black dark:text-white"
                } rounded-full text-[13px] transition-all duration-100 leading-[14px] font-semibold tracking-wide p-2 flex justify-center items-center`}
                onClick={section.onClick}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <hr className="border dark:border-customGrey-blackBg" />
    </>
  );
};

export default RequestSectionNavBar;
