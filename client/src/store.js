import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import passwordReducer from "./slices/passwordSlice";
import { apiSlice } from "./slices/apiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    passwordOptions: passwordReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
