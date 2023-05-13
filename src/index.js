import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App store={store} />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </MantineProvider>
);

window.store = store;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
