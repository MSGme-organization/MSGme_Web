import {
  activity,
  animals,
  emojiTypes,
  foods,
  objects,
  peoples,
  smileys,
  symbols,
  travels,
} from "@/utils/emoji-data";
import React from "react";

interface Props {
  handleClick: (emoji: string) => void;
}

const emojiData = [
  smileys,
  peoples,
  animals,
  foods,
  activity,
  travels,
  objects,
  symbols,
];

const EmojiPicker: React.FC<Props> = ({ handleClick }) => {
  const [emoji, setEmoji] = React.useState<number>(0);

  return (
    <div className="w-[350px] h-[400px] bg-white dark:bg-black rounded shadow-sm select-none">
      <div className="bg-white dark:bg-black h-[50px] flex items-center px-2 gap-2 w-full rounded-sm">
        {emojiTypes.map((bg: string, index: number) => (
          <button
            onClick={() => setEmoji(index)}
            className={`h-[30px] w-full rounded-lg outline dark:outline-white border-none outline-0 text-[20px] ${
              index === emoji
                ? "bg-blue-100 dark:bg-gray-700"
                : "bg-white dark:bg-black"
            }`}
            key={index}
          >
            {bg}
          </button>
        ))}
      </div>
      <div className="px-2 pb-2 relative h-[350px] overflow-auto remove-scrollbar">
        {/* <div className="px-2 pb-2 relative h-[100%] overflow-auto"> */}
        {Object.keys(emojiData[emoji]).map((key, index) => (
          <>
            <p className="font-bold sticky top-[0px] bg-white text-black dark:text-white dark:bg-black z-10 text-[15px] py-2 text-left">
              {key}
            </p>
            <div key={index} id={key}>
              <div className="grid grid-cols-6 justify-items-center items-center">
                {emojiData[emoji][key].map((emoji: any, index: number) => (
                  <button
                    type="button"
                    key={index}
                    className="cursor-pointer text-[24px] bg-transparent border-none outline-none hover:bg-blue-100 hover:dark:bg-gray-900 py-2.5 px-2 rounded-md"
                    onClick={() => {
                      handleClick(emoji);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <div className="bg-white dark:bg-black h-[40px] flex justify-start items-center ps-5 flex-row gap-2">
        {EmojiBG.map((bg: string, index: number) => (
          <button
            onClick={() => setColorCode(index)}
            className={`h-[20px] w-[20px] bg-[${bg}] rounded-lg outline outline-black dark:outline-white ${
              index === colorCode ? "outline-1" : "outline-0"
            }`}
            key={index}
          ></button>
        ))}
      </div> */}
    </div>
  );
};

export default EmojiPicker;
