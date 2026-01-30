import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  user: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setUser } = adminSlice.actions;
export default adminSlice.reducer;
