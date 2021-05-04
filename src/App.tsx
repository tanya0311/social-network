import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/header/Header";
import Nav from "./components/nav/nav";
import Profile from "./components/Profile/Profile";

function App() {
  // debugger;

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Nav />
        <div className="app-wrapper-content">
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
