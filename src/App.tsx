import React, { ComponentType } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/header/Header";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/Login/Login";
import Nav from "./components/nav/nav";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer1 from "./components/Users/UsersContainer";
import { initialStatePropsType } from "./redux/auth-reducer";
import { connect } from "react-redux";
import { RootReducersType } from "./redux/redux-store";
import { compose } from "redux";
import {  initialazeAppTC } from "./redux/app-reducer";
import { Preloader } from "./components/OtherInterface/Preloader/Preloader";

class App extends React.Component<AuthPropsType, initialStatePropsType> {
  
  componentDidMount() {
    this.props.initialazeAppTC();
  }
  render() {
    if(!this.props.initialazed){
      return <Preloader/>
    }
    return (
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
    );
  }
}

// контейнерная компонента  mapStateToProps
const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    initialazed: state.app.initialazed
  };
};

// контейнерная компонента  type
type MapStateToPropsType = {
  initialazed: boolean
};

type MapDispathToPropsType = {
  initialazeAppTC: () => void;
  // logoutTC: () => void;
};
export type AuthPropsType = MapStateToPropsType & MapDispathToPropsType;

//  контейнерная компонента
export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(
    mapStateToProps,
    { initialazeAppTC }
  ),
  withRouter
)(App);
