import { Dropdown } from "flowbite-react";
import React from "react";

import { ReactionIcon } from "@/utils/svgs";
import { Toolbar } from "./EmojiToolbar";

const Reaction = ({
  position,
  setEmojiReaction,
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
  setEmojiReaction: (emoji: string) => void;
}) => {
  const handleReaction = (emoji: any) => {
    setEmojiReaction(emoji);
  };

  return (
    <>
      <Dropdown
        label=""
        placement={position}
        dismissOnClick={true}
        className="bg-transparent dark:bg-transparent shadow-none border-none p-0"
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
          <Toolbar handleReaction={handleReaction} />
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default React.memo(Reaction);
