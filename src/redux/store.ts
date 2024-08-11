import { configureStore } from "@reduxjs/toolkit";
import invitationsSlice from "./invitations/invitationsSlice";
import profileReducer from "./profile/profileSlice";
import requestUserSlice from "./requestUsers/requestUserSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
      invitations: invitationsSlice,
      reqUsers: requestUserSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
