import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const initialState = {
  invitations: [],
  searchData: [],
};

const requestSlice = createSlice({
  name: "request-section",
  initialState,
  reducers: {
    updateSearchUserState(state: any, action: any) {
      state.searchData = action.payload;
      return state;
    },
    updateInvitationState(state: any, action: any) {
      state.invitations = action.payload;
      return state;
    },
  },
});

const { updateSearchUserState, updateInvitationState } = requestSlice.actions;

export const updateReqUsers = (data) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateSearchUserState(data));
  };
};

export const updateInvitations = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateInvitationState(data));
  };
};

export default requestSlice.reducer;
