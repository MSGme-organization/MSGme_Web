import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { fetchChatList } from "@/query/friends-list/friendsList";
import { ChatListType } from "@/app/api/v1/(friends)/get-friends/route";

const initialState: ChatListType[] = [];

const chatListSlice = createSlice({
  name: "chatListSlice",
  initialState: { data: initialState },
  reducers: {
    addChatList: (state: any, action: PayloadAction) => {
      state.data = action.payload;
    },
  },
});

const { addChatList } = chatListSlice.actions;

export const fetchChatListData = () => {
  return async (dispatch: AppDispatch) => {
    const response = await fetchChatList();

    dispatch(addChatList(response.data?.data?.chatList));
  };
};

export default chatListSlice.reducer;
