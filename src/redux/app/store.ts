import {configureStore} from '@reduxjs/toolkit';
import {reducer as themeSliceReducer} from '../features/theme/themeSlice';
import {reducer as userSliceReducer} from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    user: userSliceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
