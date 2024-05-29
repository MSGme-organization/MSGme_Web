import { Dropdown, FlowbiteDropdownTheme } from "flowbite-react";
import Image from "next/image";
import React from "react";

interface MenuProps {
  renderTrigger:
    | ((
        theme: FlowbiteDropdownTheme
      ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>)
    | undefined;
  dpItems: Array<{ label: string; icon: string; fn: () => void }>;
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end"
    | undefined;
}

const Menu: React.FC<MenuProps> = ({ renderTrigger, dpItems, position }) => {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={renderTrigger}
      placement={position}
    >
      {dpItems.map((item, index) => (
        <Dropdown.Item
          key={index}
          onClick={item.fn}
          className="text-left w-full py-2 px-4 text-black flex gap-2 hover:bg-gray-100"
        >
          <Image src={item.icon} width={20} height={20} alt={item.label} />
          <p className="ml-2 text-sm font-semibold">{item.label}</p>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default React.memo(Menu, () => true);
