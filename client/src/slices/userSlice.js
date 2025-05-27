import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    username: '',
    password: '',
    email: '',
    pfpSrc: 'http://localhost:3000/pfps/Default_pfp.png',
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { username, password, email, pfpSrc } = action.payload;
      state.userInfo = { username, password, email, pfpSrc };
    },
    clearUser(state) {
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;