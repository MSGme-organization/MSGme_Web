import { Message } from "@/app/(chat)/chat/@indChat/[id]/page";
import { users } from "@/utils/data";
import { Modal } from "flowbite-react";
import Image from "next/image";
import React from "react";

interface ForwardModalProps {
  forwardMsg: Message | null;
  setForwardMsg: React.Dispatch<React.SetStateAction<Message | null>>;
}

const ForwardModal: React.FC<ForwardModalProps> = ({
  forwardMsg,
  setForwardMsg,
}) => {
  return (
    <Modal
      show={Boolean(forwardMsg)}
      onClose={() => setForwardMsg(null)}
      dismissible
    >
      <Modal.Body className="dark:bg-customGrey-blackBg bg-gray-50 text-black dark:text-white">
        <div className="p-2">
          <h1 className="text-black dark:text-white text-lg font-semibold">
            Forwarding Message...
          </h1>
          <div className="py-4">
            {forwardMsg && (
              <div className="w-full bg-gray-200 mb-4 dark:bg-customGrey-dark text-black dark:text-white rounded-md ">
                <div className="border-l-[5px] flex justify-between items-center border-primary p-3 rounded-md  font-semibold">
                  <p> {forwardMsg.message}</p>
                </div>
              </div>
            )}
            {users.slice(0, 5).map((user, index) => (
              <div
                className="w-full px-4 py-3 flex justify-between items-center"
                key={index}
              >
                <div className="flex gap-5 items-center">
                  <Image
                    src={user.avatarImage}
                    alt={`${user.name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full bg-green-300  aspect-square"
                  />
                  <p className="font-semibold">{user.name}</p>
                </div>
                <button className="bg-primary px-4 text-white font-bold rounded-full text-[18px]">
                  Send
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForwardModal;
