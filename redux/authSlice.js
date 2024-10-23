import { createSlice } from '@reduxjs/toolkit';

// Static users
const users = [
  { id: 1, name: 'Pranjal Powale', email: 'pranjalpowale@gmail.com', password: 'Pranjal123@' },
  { id: 2, name: 'Akash Bhavar', email: 'akashbhavar@gmail.com', password: 'Akash123@' },
  { id: 3, name: 'Gargi Vaidya', email: 'gargivaidya@gmail.com', password: 'Gargi123@' },
  { id: 4, name: 'Leena Powale', email: 'leenapowale@gmail.com', password: 'Leena123@' },
  { id: 5, name: 'Rajesh Powale', email: 'rajeshpowale@gmail.com', password: 'Rajesh123@' },
];

// Initial state
const initialState = {
  isLoggedIn: false,
  currentUser: null,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.isLoggedIn = true;
        state.currentUser = user;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
