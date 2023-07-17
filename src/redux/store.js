import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import vacanciesReducer from './vacanciesReducer'
import favReducer from './favReducer'
import { apiSlice } from './apiSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favReducer'], //favourites
}

const persistedFavReducers = persistReducer(persistConfig, favReducer)

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        vacancies: vacanciesReducer,
        favourites: persistedFavReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk))) */

export const persistor = persistStore(store)

/* export default store */