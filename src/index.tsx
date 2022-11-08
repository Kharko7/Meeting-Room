import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { SnackBarContextProvider } from './context/snackbar-context';
import {store} from "./redux&saga/store";
import styles from "./components/toggle/toggle.module.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let checked = localStorage.getItem('theme');
let check = checked?JSON.parse(checked):false;
check ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');


root.render(
    <BrowserRouter>
      <Provider store={store}>
        <SnackBarContextProvider>
          <App />
        </SnackBarContextProvider>
      </Provider>
    </BrowserRouter>
);

