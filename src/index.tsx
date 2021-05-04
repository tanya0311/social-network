import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import store, { RootReducersType } from "./redux/redux-store";
import StoreContext from "./StoreContext";
import { Provider } from "react-redux";

export function rernderApp(state: RootReducersType) {
  // debugger
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App  />
      </Provider>
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
