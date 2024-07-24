import { CloseIcon, ReactionIcon } from "@/utils/svgs";
import { Dropdown } from "flowbite-react";
import { useFormik } from "formik";
import Image from "next/image";
import React from "react";
import Input from "../common-components/Input";
import EmojiPicker from "../emoji/EmojiPicker";

type TextMessageFieldProps = {
  setMessages: Function;
  replyMsg?: any;
  setReplyMsg: Function;
};

const TextMessageField = ({
  setMessages,
  setReplyMsg,
  replyMsg,
}: TextMessageFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const formik = useFormik({
    initialValues: {
      msg: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (replyMsg !== null || values.msg) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev[prev.length - 1].id + 1,
            username: "Me",
            issentbyme: true,
            message: values.msg,
            repliedMsg: replyMsg,
          },
        ]);
        setReplyMsg(null);
        resetForm();
      }
    },
  });

  React.useEffect(() => {
    if (replyMsg) {
      inputRef.current?.focus();
    }
  }, [replyMsg]);

  const handleEmojiClick = (emoji: any) => {
    formik.setFieldValue("msg", formik.values.msg + emoji);
  };

  return (
    <div className="w-full p-4  sticky bottom-0 left-0 flex shadow border-t border-gray-100 dark:border-gray-600 flex-col bg-white dark:bg-customGrey-black z-10">
      {replyMsg && (
        <div className="w-full mb-4 bg-white dark:bg-customGrey-black text-black dark:text-white">
          <div className="border-l-[5px] flex justify-between items-center border-primary p-3 bg-gray-100 dark:bg-customGrey-blackBg rounded-md font-semibold">
            <p> {replyMsg.message}</p>
            <button className="" onClick={() => setReplyMsg(null)}>
              {CloseIcon()}
            </button>
          </div>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="w-full flex gap-4 items-center">
          <Dropdown
            label=""
            dismissOnClick={false}
            className="bg-transparent w-[95%] md:w-auto dark:bg-transparent shadow-none border-none p-0 flex justify-center"
            renderTrigger={() => (
              <div className="h-[41px] w-[41px] cursor-pointer active:scale-110 p-2 active:opacity-100 bg-gray-100 rounded-full  dark:bg-customGrey-blackBg hover:bg-opacity-50">
                <ReactionIcon />
              </div>
            )}
          >
            <Dropdown.Item
              className="w-full bg-transparent shadow-none p-0 border-none hover:bg-transparent position-relative"
              style={{ backgroundColor: "transparent" }}
            >
              <EmojiPicker handleClick={handleEmojiClick} />
              {/* <Picker
                className="dark:bg-black dark:border-black"
                style={{ width: "100%" }}
                reactionsDefaultOpen={false}
                searchDisabled={true}
                onEmojiClick={(emoji) =>
                  formik.setFieldValue("msg", formik.values.msg + emoji.emoji)
                }
              /> */}
            </Dropdown.Item>
          </Dropdown>
          <div className="flex-grow">
            <Input
              ref={inputRef}
              label={""}
              type={"text"}
              required={false}
              classes={"select-none"}
              iconClass={undefined}
              LeftIcon={undefined}
              RightIcon={undefined}
              placeholder="Enter your Message Here"
              {...formik.getFieldProps("msg")}
              error={formik.errors.msg}
              onChange={formik.handleChange}
              value={formik.values?.msg}
            />
          </div>
          <button
            type="submit"
            className="text-white flex w-[40px] justify-center items-center  rounded-full "
          >
            <Image src={"/svgs/send.svg"} width={30} height={30} alt="send" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextMessageField;
