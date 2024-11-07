import axios from "axios";

export const fetchMessage = async (roomId: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_CHAT_SOCKET_URL +
        "api/v1/message//get-message/" +
        roomId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

