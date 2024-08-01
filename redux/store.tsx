'use client'
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: () => any) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;