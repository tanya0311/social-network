import React from "react";
import { connect } from "react-redux";
import {
  initialStatePropsType,
  setAuthUserData,
} from "../../redux/auth-reducer";
import { RootReducersType } from "../../redux/redux-store";
import { Preloader } from "../OtherInterface/Preloader/Preloader";
import Header from "./Header";
import { getHeaderApi } from "../../api/API";

type MapStateToPropsType = {
  isAuth: boolean;
  login: null | string;
};

type MapDispathToPropsType = {
  setAuthUserData: (id: number, email: string, login: string) => void;
};
export type AuthPropsType = MapStateToPropsType & MapDispathToPropsType;

class HeaderContainer extends React.Component<
  AuthPropsType,
  initialStatePropsType
> {
  componentDidMount() {
    getHeaderApi.getHeader().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data.login;
        this.props.setAuthUserData(id, email, login);
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
