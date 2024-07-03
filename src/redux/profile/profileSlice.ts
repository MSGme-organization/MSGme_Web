import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { useMutation } from "@tanstack/react-query";
import { getProfile } from "@/query/profile/getProfile";
import toast from "react-hot-toast";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  dob: "",
  bio: "",
  avatar: "blank-profile-picture-973460_960_720_mkhsln",
};

const profileSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateProfile(state: any, action: any) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

const { updateProfile } = profileSlice.actions;

export const fetchProfile = () => {
  return async (dispatch: AppDispatch) => {
    const res = await getProfile();
    dispatch(updateProfile(res.data.data));
  };
};

export default profileSlice.reducer;
