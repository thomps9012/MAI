import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    logged_in: false,
  },
  reducers: {
    loginUser: (state, action) => {
      (state.user = action.payload), (state.logged_in = true);
    },
    logoutUser: (state) => {
      (state.user = null), (state.logged_in = false);
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
