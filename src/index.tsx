import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from 'redux/redux-store';
import { Provider } from 'react-redux'
import { SnackBarContextProvider } from 'context/snackbar-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackBarContextProvider>
          <App />
        </SnackBarContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

