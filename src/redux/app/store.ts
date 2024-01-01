import {configureStore} from '@reduxjs/toolkit';
import {reducer as themeSliceReducer} from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
