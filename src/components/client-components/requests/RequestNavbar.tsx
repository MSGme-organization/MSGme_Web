import { BackIcon } from "@/utils/svgs";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  handleActiveSection: (section: 0 | 1) => void;
  activeSection: 0 | 1;
}

const RequestNavbar: React.FC<Props> = ({
  handleActiveSection,
  activeSection,
}) => {
  const router = useRouter();

  const sections = React.useMemo(
    () => [
      {
        id: 0,
        name: "Send Request",
        onClick: () => handleActiveSection(0),
      },
      {
        id: 1,
        name: "Invitations",
        onClick: () => handleActiveSection(1),
      },
    ],
    []
  );

  const handleBack = () => router.back();

  return (
    <>
      <div className="w-full flex bg-bgColor dark:bg-customGrey-black justify-center items-center p-4 h-[70px] sticky top-0 left-0">
        <div className="flex gap-2 absolute start-4">
          <button
            className="rounded-full bg-gray-50  p-2 flex justify-center items-center  active:scale-[.97] dark:bg-gray-700"
            onClick={handleBack}
          >
            {BackIcon()}
          </button>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-200 dark:bg-gray-800 flex rounded-full">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`${
                  activeSection === section.id
                    ? "bg-primary text-white"
                    : "text-black dark:text-white"
                } rounded-full text-[12px] transition-all duration-100 leading-[14px] font-semibold tracking-wide py-2 px-3 flex justify-center items-center`}
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

export default RequestNavbar;
