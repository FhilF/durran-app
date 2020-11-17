import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";

import store from "Utils/Store";
import ReactBlockstack from 'react-blockstack';

import { appConfig , finished } from './UserSession.js';


const blockstack = ReactBlockstack({ appConfig });
(() => {
  if (blockstack.userSession.isSignInPending()) {
    blockstack.userSession.handlePendingSignIn().then(userData => {
      finished(() => {
        console.log('handling pending sign in on launch');
      })({ userSession: blockstack.userSession });
    });
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
