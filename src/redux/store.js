import { applyMiddleware, combineReducers, legacy_createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import authReducer from './authReducer'
import vacanciesReducer from './vacanciesReducer'
import favReducer from './favReducer'

let reducers = combineReducers({
    authReducer,
    vacanciesReducer,
    favReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export let persistor = persistStore(store);

export default store;