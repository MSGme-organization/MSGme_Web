import { CopyIcon } from "@/utils/svgs";
import { Modal } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface ShareModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  shareUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  openModal,
  setOpenModal,
  shareUrl,
}) => {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast("Copied to clipboard", {
      duration: 700,
      position: "bottom-center",
    });
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible>
      <Modal.Body>
        <div className="p-2">
          <h1 className="text-black dark:text-white text-lg font-semibold">
            Sharing Profile...
          </h1>
          <div className="flex gap-4 py-4">
            <FacebookShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton
              url={
                "https://codesandbox.io/p/devbox/react-share-demo-forked-zj2hnj?file=%2Fsrc%2FApp.tsx%3A66%2C8-72%2C1&workspaceId=0b841d1a-100c-4fff-b923-571ba85af587"
              }
              className="Demo__some-network__share-button"
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={
                "https://codesandbox.io/p/devbox/react-share-demo-forked-zj2hnj?file=%2Fsrc%2FApp.tsx%3A66%2C8-72%2C1&workspaceId=0b841d1a-100c-4fff-b923-571ba85af587"
              }
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
        <div className="relative">
          <p className="text-black dark:text-white border dark:border-gray-500 border-gray-200 rounded-md p-3 dark:bg-gray-600 bg-gray-50 font-bold">
            {shareUrl}
          </p>
          <button
            onClick={copyUrl}
            className="absolute bottom-2 right-2 dark:text-white text-black"
          >
            {CopyIcon()}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
