import React from "react";
import { connect } from "react-redux";
import {
  getAuthUserDataTC,
  initialStatePropsType,
  setAuthUserData,
} from "../../redux/auth-reducer";
import { RootReducersType } from "../../redux/redux-store";
import { Preloader } from "../OtherInterface/Preloader/Preloader";
import Header from "./Header";
import { getHeaderAuthApi } from "../../api/API";
import { logoutTC } from "../../redux/auth-reducer";

type MapStateToPropsType = {
  isAuth: boolean;
  login: null | string;
};

type MapDispathToPropsType = {
  getAuthUserDataTC: () => void;
  logoutTC: () => void;
};
export type AuthPropsType = MapStateToPropsType & MapDispathToPropsType;

class HeaderContainer extends React.Component<
  AuthPropsType,
  initialStatePropsType
> {
  componentDidMount() {
    this.props.getAuthUserDataTC();
  }

  render() {
    return (
      <div>
        {/* <Header {...this.props} /> */}
        <Header
          login={this.props.login}
          isAuth={this.props.isAuth}
          logoutTC={this.props.logoutTC}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispathToPropsType,
  {},
  RootReducersType
>(mapStateToProps, { getAuthUserDataTC, logoutTC })(HeaderContainer);
