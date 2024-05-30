import { Dropdown } from "flowbite-react";
import React from "react";
import Picker from "emoji-picker-react";
import { ReactionIcon } from "@/utils/svgs";

const Reaction = ({
  position,
}: {
  position:
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
}) => {
  const handleReaction = (emoji: any) => {
    console.log(emoji);
  };
  return (
    <>
      <Dropdown
        label=""
        placement={position}
        dismissOnClick={false}
        className="bg-transparent shadow-none border-none p-0"
        renderTrigger={() => (
          <span className="flex justify-center items-center mx-2 dark:text-customGrey cursor-pointer">
            <ReactionIcon />
          </span>
        )}
      >
        <Dropdown.Item
          className="w-full bg-transparent shadow-none p-0 border-none hover:bg-transparent"
          style={{ backgroundColor: "transparent" }}
        >
          <Picker
            className="dark:bg-black dark:border-black"
            style={{ width: "100%" }}
            onReactionClick={handleReaction}
            reactionsDefaultOpen={true}
          />
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default React.memo(Reaction);
