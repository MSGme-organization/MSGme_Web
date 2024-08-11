import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const initialState = {
  users: [],
};

const reqUsers = createSlice({
  name: "request-users",
  initialState,
  reducers: {
    updateState(state: any, action: any) {
      state.users = action.payload;
      return state;
    },
  },
});

const { updateState } = reqUsers.actions;

export const updateReqUsers = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateState(data));
  };
};

export default reqUsers.reducer;
