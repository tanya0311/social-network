import React from "react";
import { connect } from "react-redux";
import {
  initialStatePropsType,
} from "../../redux/auth-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Header from "./Header";
import { logoutTC } from "../../redux/auth-reducer";

type MapStateToPropsType = {
  isAuth: boolean;
  login: null | string;
};

type MapDispathToPropsType = {
  logoutTC: () => void;
};
export type AuthPropsType = MapStateToPropsType & MapDispathToPropsType;

class HeaderContainer extends React.Component<
  AuthPropsType,
  initialStatePropsType
> {
 

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
>(mapStateToProps, { logoutTC })(HeaderContainer);
