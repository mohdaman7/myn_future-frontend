import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: {},
    loading: false,
    error: null,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    userLogin: (state) => {
      state.loading = true;
      state.error = null;
      state.isSuccess = false;
      state.isError = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
      state.isError = false;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSuccess = false;
      state.isError = true;
    },
    resetLoginState: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
      state.isSuccess = false;
      state.isError = false;
    }
  }
});

export const {
  userLogin,
  loginSuccess,
  loginFail,
  resetLoginState
} = loginSlice.actions;

// Optional selectors
export const selectLoginState = (state) => state.login;
export const selectUserData = (state) => state.login.data;
export const selectIsLoading = (state) => state.login.loading;
export const selectIsSuccess = (state) => state.login.isSuccess;
export const selectIsError = (state) => state.login.isError;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
