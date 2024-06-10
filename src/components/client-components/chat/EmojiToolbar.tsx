"use client";
import { useEffect, useRef, useState } from "react";

export const Toolbar = ({
  handleReaction,
}: {
  handleReaction: (emoji: string) => void;
}) => {
  const [currentEmoji, setCurrentEmoji] = useState<{
    emoji: string;
    id: number;
  } | null>(null);
  const clearEmojiTimeout = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (clearEmojiTimeout.current) {
        clearTimeout(clearEmojiTimeout.current);
      }
    };
  }, []);

  const handleEmojiClick = async (emoji: string) => {
    handleReaction(emoji);
    if (clearEmojiTimeout.current) {
      clearTimeout(clearEmojiTimeout.current);
    }

    setCurrentEmoji({ emoji, id: Date.now() });

    clearEmojiTimeout.current = setTimeout(() => {
      setCurrentEmoji(null);
    }, 3000);
  };

  const Emoji = ({ label, emoji }: { label: string; emoji: string }) => (
    <div className="relative w-fit">
      <div
        className="font-emoji text-2xl leading-6 bg-transparent p-1 relative transition-bg-color duration-600 inline-flex justify-center items-center align-middle rounded-full ease-in-out hover:scale-125 active:duration-0"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
        onClick={() => handleEmojiClick(emoji)}
      >
        {emoji}
        {currentEmoji && currentEmoji.emoji === emoji && (
          <span
            key={currentEmoji.id}
            className="font-emoji absolute -top-10 left-0 right-0 mx-auto animate-flyEmoji duration-3000"
          >
            {currentEmoji.emoji}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white dark:bg-black dark:border-black border border-gray-300 rounded-full mx-auto mt-4 mb-4">
        <div className="grid items-center justify-start">
          <div className="p-2">
            <div className="grid items-center justify-start grid-flow-col">
              {REACTIONS.map((reaction) => (
                <Emoji
                  key={reaction.emoji}
                  emoji={reaction.emoji}
                  label={reaction.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const REACTIONS = [
  {
    emoji: "😂",
    label: "joy",
  },
  {
    emoji: "😍",
    label: "love",
  },
  {
    emoji: "😮",
    label: "wow",
  },
  {
    emoji: "🙌",
    label: "yay",
  },
  {
    emoji: "👍",
    label: "up",
  },
  {
    emoji: "👎",
    label: "down",
  },
];
