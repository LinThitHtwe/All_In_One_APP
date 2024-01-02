import {createSlice} from '@reduxjs/toolkit';
import {storage} from '../../../../MMKV';

const storedUser = storage.getString('loginuser');
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      storage.set('loginuser', JSON.stringify(action.payload));
    },
    clearUser: state => {
      state.user = null;
      storage.delete('loginuser');
    },
  },
});

export const {reducer, actions} = userSlice;
export default userSlice;
