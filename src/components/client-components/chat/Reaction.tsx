import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";
import Picker from "emoji-picker-react";

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
          <Image
            src={"/svgs/emoji.svg"}
            className="cursor-pointer mx-2"
            width={20}
            height={20}
            alt="emoji"
          />
        )}
      >
        <Dropdown.Item
          className="w-full bg-transparent shadow-none p-0 border-none hover:bg-transparent"
          style={{ backgroundColor: "transparent" }}
        >
          <Picker
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
