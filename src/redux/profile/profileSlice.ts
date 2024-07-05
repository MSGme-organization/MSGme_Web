import { getProfile } from "@/query/profile/getProfile";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  dob: "",
  bio: "",
  avatar: "",
};

const profileSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addProfileData(state: any, action: any) {
      state = action.payload
      return state
    },
    updateProfile(state: any, action: any) {
      state = { ...state, ...action.payload }
      return state
    },
  },
});

const { updateProfile, addProfileData } = profileSlice.actions;

export const fetchProfile = () => {
  return async (dispatch: AppDispatch) => {
    const res = await getProfile();
    dispatch(addProfileData(res.data.data));
  };
};

export const updateProfileData = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateProfile(data));
  };
};


export default profileSlice.reducer;