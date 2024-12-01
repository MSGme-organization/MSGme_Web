import { MessageType } from "@/components/chat/Message";
import axios, { AxiosError, AxiosResponse } from "axios";

export const fetchMessage = async (roomId: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_CHAT_SOCKET_URL +
        "api/v1/message/get-message/" +
        roomId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    await axios.delete(
      process.env.NEXT_PUBLIC_CHAT_SOCKET_URL +
        "api/v1/message/delete-message/" +
        messageId
    );
  } catch (error) {
    console.log(error);
  }
};

export const editMessage = async (
  messageId: string,
  data: Pick<MessageType, "message" | "iv">
) => {
  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_CHAT_SOCKET_URL +
        "api/v1/message/edit-message/" +
        messageId,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error at message delete");
  }
};
