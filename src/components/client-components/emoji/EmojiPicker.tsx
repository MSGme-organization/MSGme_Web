import { EmojiTypes } from "@/utils/emoji-data";

const EmojiPicker = () => {
  return (
    <div className="w-[300px] h-[300px] bg-white rounded shadow-sm overflow-auto">
      <div className="px-2 pb-2">
        {Object.keys(EmojiTypes).map((emojiType, index) => (
          <>
            <p className="font-bold sticky top-0 bg-white z-10 text-[15px] py-2 text-left">
              {emojiType}
            </p>
            <div key={index} id={emojiType}>
              <div className="grid grid-cols-6 justify-items-center items-center">
                {EmojiTypes[emojiType].map((emoji, index) => (
                  <button
                    key={index}
                    className="cursor-pointer text-[24px] bg-transparent border-none outline-none hover:bg-blue-100 py-2.5 px-2 rounded-md"
                    onClick={() => {
                      console.log(emoji);
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
    </div>
  );
};

export default EmojiPicker;
