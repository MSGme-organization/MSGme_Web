import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
