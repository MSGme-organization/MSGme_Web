import React from "react";

interface ContextProps {
  items: Array<{ label: string; icon: string; fn: () => void }>;
  top: number;
  left: number;
}

const Context: React.FC<ContextProps> = ({ top, left, items }) => {
  return (
    <div className={`absolute top-[${top}px] left-[${left}px]`}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={item.fn}
          className="text-left w-full py-2 px-4 text-black flex gap-2 hover:bg-gray-100"
        >
          <img src={item.icon} width={20} height={20} alt={item.label} />
          <p className="ml-2 text-sm font-semibold">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Context;
