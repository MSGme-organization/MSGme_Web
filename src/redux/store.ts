import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import friendsListReducer from "./friends-list/friendsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
      friendsList: friendsListReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
