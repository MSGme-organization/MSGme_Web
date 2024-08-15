import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import requestReducer from "./requests/requestSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
      request: requestReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
