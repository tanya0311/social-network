import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/header/Header";
import HeaderContainer from "./components/header/HeaderContainer";
import { Login } from "./components/Login/Login";
import Nav from "./components/nav/nav";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer1 from "./components/Users/UsersContainer";

function App() {
  // debugger;

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="app-wrapper-header">
          <HeaderContainer />
        </div>

        {/* <Header /> */}
        <div className="app-wrapper-nav">
          <Nav />
        </div>
        <div className="app-wrapper-content">
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/users" render={() => <UsersContainer1 />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
