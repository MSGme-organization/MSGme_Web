import { RightArrowIcon } from "@/utils/svgs";
import React from "react";

interface SettingItemProps {
  icon: () => React.ReactNode;
  label: string;
  showArrow?: boolean;
  fn: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  showArrow,
  fn,
}) => {
  return (
    <button
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 active:scale-[.99]"
      onClick={fn}
    >
      <div className="flex gap-2 items-center w-[90%]">
        <div className="text-primary w-[10%] flex justify-center items-center min-w-[30px]">
          {icon()}
        </div>
        <p className="text-[17px] font-[700]">{label}</p>
      </div>
      {showArrow && RightArrowIcon()}
    </button>
  );
};

export default SettingItem;
