import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { fetchFriendsList } from "@/query/friends-list/friendsList";

const initialState = [];

const friendsSlice = createSlice({
  name: "friendsSlice",
  initialState: { data: initialState },
  reducers: {
    addFriendsList: (state: any, action: PayloadAction) => {
      state.data = action.payload;
    },
  },
});

const { addFriendsList } = friendsSlice.actions;

export const fetchFriendsListData = () => {
  return async (dispatch: AppDispatch) => {
    const response =await fetchFriendsList();

    dispatch(addFriendsList(response.data?.data?.friendsList));
  };
};



export default friendsSlice.reducer;
