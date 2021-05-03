import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { StatePropsType } from "./redux/state";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
// import store from "./redux/state";
import store, { reducersType } from "./redux/redux-store";

export function rernderApp(state: reducersType) {
  // debugger
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

rernderApp(store.getState());
store.subscribe(() => {
  let state = store.getState();
  rernderApp(state);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
