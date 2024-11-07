import React from "react";

interface ContextProps {
  items: Array<{ label: string; icon: () => React.ReactNode; fn: () => void }>;
  contextRef: React.RefObject<HTMLDivElement>;
  position: "right-bottom" | "top-left";
  last: boolean;
  setContextCord: React.Dispatch<
    React.SetStateAction<{ top: number; left: number } | null>
  >;
}

const Context: React.FC<ContextProps> = ({
  position,
  items,
  contextRef,
  setContextCord,
  last,
}) => {
  const getClassNames = () => {
    if (position === "right-bottom") {
      return last
        ? "bottom-[100%] md:left-[100%] left-0"
        : "top-[100%] md:left-[100%] left-0";
    } else if (position === "top-left") {
      return last
        ? "bottom-[100%] md:right-[100%] right-0"
        : "top-[100%] md:right-[100%] right-0";
    }
    return "";
  };

  return (
    <div
      className={`absolute ${getClassNames()} dark:bg-customGrey-blackBg border border-gray-100 dark:border-gray-600 rounded-md shadow bg-white text-black dark:text-white z-10 select-none`}
      ref={contextRef}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.fn();
            setContextCord(null);
          }}
          className="text-left w-full py-2 px-4 flex gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          {item.icon()}
          <p className="ml-2 text-sm font-semibold">{item.label}</p>
        </button>
      ))}
    </div>
  );
};

export default React.memo(Context);
