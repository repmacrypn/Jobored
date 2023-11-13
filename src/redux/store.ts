import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { apiSlice } from '@/redux/apiSlice'
import authReducer from '@/redux/authSlice'
import favReducer from '@/redux/favSlice'
import vacanciesReducer from '@/redux/vacanciesSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedFavReducers = persistReducer(persistConfig, favReducer)

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    vacancies: vacanciesReducer,
    favourites: persistedFavReducers,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
