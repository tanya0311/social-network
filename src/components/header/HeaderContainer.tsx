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

type MapStateToPropsType = {
  // email:null | string;
  isAuth: boolean;
  login: null | string;
};

type MapDispathToPropsType = {
  // setAuthUserData: (id: number, email: string, login: string) => void;
  getAuthUserDataTC: () => void;
};
export type AuthPropsType = MapStateToPropsType & MapDispathToPropsType;

class HeaderContainer extends React.Component<
  AuthPropsType,
  initialStatePropsType
> {
  componentDidMount() {
    this.props.getAuthUserDataTC();
    // getHeaderAuthApi.authMe().then((data) => {
    //   if (data.resultCode === 0) {
    //     let { id, email, login } = data.data;
    //     this.props.setAuthUserData(id, email, login);
    //   }
    // });
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
>(mapStateToProps, { getAuthUserDataTC })(HeaderContainer);
