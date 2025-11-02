import { createSlice, configureStore } from "@reduxjs/toolkit";

// 1️⃣ Create slice
const authSlice = createSlice({
  name: "auth",
initialState: {user: null, isLoggedIn: false},
reducers: {
  login(state, action){
    state.isLoggedIn = true;
    state.user = action.payload;
  },
  logout(state){
    state.isLoggedIn = false;
    state.user = null;
  }
}
});

// 2️⃣ Export slice actions (to use in components later)
export const authActions = authSlice.actions;

// 3️⃣ Configure the store
export const store = configureStore({
  reducer: authSlice.reducer,
});
