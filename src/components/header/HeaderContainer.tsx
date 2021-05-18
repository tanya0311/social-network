import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  initialStatePropsType,
  setAuthUserData,
} from "../../redux/auth-reducer";
import { RootReducersType } from "../../redux/redux-store";
import { Preloader } from "../OtherInterface/Preloader/Preloader";
import Header from "./Header";

// type MapStateToPropsType = initialStatePropsType;
type MapStateToPropsType = {
  isAuth:boolean
  login: null | string;
};

type MapDispathToPropsType = {
  setAuthUserData: (
    id: null | number,
    email: null | string,
    login: null | string
  ) => void;
};
export type AuthPropsType = MapStateToPropsType & MapDispathToPropsType;

class HeaderContainer extends React.Component<
  AuthPropsType,
  initialStatePropsType
> {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          let { id, email, login } = response.data.data.login;
          this.props.setAuthUserData(id,  email, login);
        }
      });
  }

  render() {
    return (
      <div>
        {/* <Header {...this.props} /> */}
         <Header login={this.props.login} isAuth={this.props.isAuth} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    // id: state.auth.id,
    // email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispathToPropsType,
  {},
  RootReducersType
>(mapStateToProps, { setAuthUserData })(HeaderContainer);
