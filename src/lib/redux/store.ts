import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import chatListReducer from "./chat-list/chatListSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
      chatList: chatListReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
