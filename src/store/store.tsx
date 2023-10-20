import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './userReducer';
import newsReducer from './newsReducer';
import applicationReducer from './applicationReducer';
import applicationsReducer from './applicationsReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    application: applicationReducer,
    applications: applicationsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
