import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserData } from '../interfaces/login.interfaces';
import { RootState } from './store';

export interface IDeviceState {
  userData: IUserData | null;
}

const initialState: IDeviceState = {
  userData: null,
};

const deviceSlice = createSlice({
  name: 'deviceSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser } = deviceSlice.actions;
export default deviceSlice.reducer;

export const selectUserData = (state: RootState) => state.user.userData;
