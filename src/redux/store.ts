import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import vacanciesReducer from './vacanciesSlice'
import favReducer from './favSlice'
import authReducer from './authSlice'
import { apiSlice } from './apiSlice'

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