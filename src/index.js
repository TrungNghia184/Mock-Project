import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import "./i18n"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>,
);
reportWebVitals();
