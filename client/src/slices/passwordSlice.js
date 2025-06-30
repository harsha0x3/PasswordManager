import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: "",
  length: 8,
  includeUpperCase: true,
  includeLowerCase: true,
  includeNums: true,
  includeSpecialChars: true,
  save: false,
  password: "",
};

const passwordSlice = createSlice({
  name: "passwordOptions",
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.account = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setLength: (state, action) => {
      state.length = Number(action.payload);
    },

    toggleUpperCase: (state, action) => {
      state.includeUpperCase = !state.includeUpperCase;
    },

    toggleLowerCase: (state, action) => {
      state.includeLowerCase = !state.includeLowerCase;
    },

    toggleNums: (state, action) => {
      state.includeNums = !state.includeNums;
    },

    toggleSpecialChars: (state, action) => {
      state.includeSpecialChars = !state.includeSpecialChars;
    },

    toggleSave: (state, action) => {
      state.save = !state.save;
    },
  },
});
export const {
  setAccountInfo,
  setPassword,
  setLength,
  toggleLowerCase,
  toggleNums,
  toggleSave,
  toggleSpecialChars,
  toggleUpperCase,
} = passwordSlice.actions;
export default passwordSlice.reducer;
