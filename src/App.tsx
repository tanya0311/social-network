import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/header/Header";
import Nav from "./components/nav/nav";
// import { PostPropsType } from "./components/Profile/MyPost/Post/Post";
import Profile from "./components/Profile/Profile";
import { reducersType } from "./redux/redux-store";
import { ActionType, StatePropsType } from "./redux/state";

type AppPropsType={
  state: reducersType
  dispatch:(action:ActionType)=>void
}

function App(props:AppPropsType) {
// debugger;

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Nav nameUser={props.state.sidebarPage.nameUser} />
        <div className="app-wrapper-content">
          {/* <Route path="/profile" component={Profile} />
          <Route  path="/dialogs" component={Dialogs} /> */}


          <Route path="/profile" render={()=><Profile state1={props.state.profilePage} dispatch={props.dispatch}
          // addPost={props.addPost} updateNewPost={props.updateNewPost}
          />} />
          <Route path="/dialogs" render={()=><Dialogs state1={props.state.dialogPage} dispatch={props.dispatch}/>} />

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
