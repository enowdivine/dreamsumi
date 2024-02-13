import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './context/UserContext';
import { Provider } from "react-redux"
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContext>
        <App />
      </UserContext>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
