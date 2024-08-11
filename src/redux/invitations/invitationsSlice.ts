import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface UpdateStatusPayload {
  status: string;
  id: string;
}

const initialState = {
  invitations: [],
};

const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    refreshState(state: any, action: PayloadAction<any>) {
      state.invitations = action.payload;
      return state;
    },
    updateStatus(state: any, action: PayloadAction<UpdateStatusPayload>) {
      console.log(action.payload);
      state = state.invitations.map((item: any) =>
        item.id === action.payload.id
          ? { ...item, status: action.payload.status }
          : item
      );
    },
  },
});

const { refreshState, updateStatus } = invitationsSlice.actions;

export const updateInvitations = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(refreshState(data));
  };
};

export const updateInvitationStatus = (status: string, id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateStatus({ status, id }));
  };
};
export default invitationsSlice.reducer;
