"use client";

import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { isValidArray } from "@/utils/objectsValidate";
import { CldImage } from "next-cloudinary";
import React from "react";
import { Reaction } from "../chat/Message";

type ReactionCardProps = {
  emojiReaction: Reaction[];
  removeReaction: () => void;
};

interface GroupedReactions {
  emoji: string;
  count: number;
  users: {
    userId: string;
    userName: string;
    timestamp: string;
  }[];
}

const ReactionsCard = ({
  emojiReaction,
  removeReaction,
}: ReactionCardProps) => {
  const groupedReactions = groupReactionsByEmoji(emojiReaction);
  const [selectReaction, setSelectReaction] = React.useState("all");

  const ReactedUserList = (reaction: Reaction) => (
    <li
      className="flex justify-between items-center cursor-pointer"
      onClick={removeReaction}
    >
      <div className="flex items-center gap-3">
        <CldImage
          src={reaction.avatar || DEFAULT_PROFILE_IMG}
          alt={`user's avatar`}
          width={30}
          height={30}
          loading="lazy"
          className="rounded-full aspect-square"
        />
        <p className="">{reaction.username}</p>
      </div>
      <span>{reaction.emoji}</span>
    </li>
  );

  const ReactionList = ({ target, label, length }) => (
    <div
      className={`flex items-center cursor-pointer ${
        selectReaction === target ? "border-b border-primary" : ""
      }`}
      onClick={() => setSelectReaction(target)}
    >
      <span className="text-lg">{label}</span>
      <span className="text-sm ml-1 text-customGrey">{length}</span>
    </div>
  );

  return (
    <div className="custom-scrollbar p-4 bg-white dark:bg-customGrey-blackBg rounded-lg shadow-lg w-80 h-[300px] animate-slide-down text-bgColor-dark dark:text-white overflow-y-auto">
      <div className=" custom-scrollbar flex items-center gap-3 overflow-x-auto">
        <ReactionList target="all" label="All" length={emojiReaction.length} />
        {isValidArray(groupedReactions) &&
          groupedReactions.map((group) => (
            <ReactionList
              target={group.emoji}
              label={group.emoji}
              length={group.count}
            />
          ))}
      </div>
      <ul className="mt-4 space-y-3">
        {emojiReaction
          .filter((reaction) =>
            selectReaction === "all" ? true : reaction.emoji === selectReaction
          )
          .map((reaction) => (
            <ReactedUserList key={reaction._id} {...reaction} />
          ))}
      </ul>
    </div>
  );
};

export default ReactionsCard;

const groupReactionsByEmoji = (reactions: Reaction[]): GroupedReactions[] => {
  return Object.values(
    reactions.reduce((acc, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = {
          emoji: reaction.emoji,
          count: 0,
          users: [],
        };
      }
      acc[reaction.emoji].count += 1;
      acc[reaction.emoji].users.push({
        userId: reaction.userId,
        userName: reaction.username,
        timestamp: reaction.timestamp as string,
      });
      return acc;
    }, {} as Record<string, GroupedReactions>)
  );
};
