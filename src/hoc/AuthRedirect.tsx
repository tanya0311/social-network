import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { RootReducersType } from "../redux/redux-store";
import { connect } from "react-redux";

export type MapStateToPropsWithRedirectType = {
  isAuth: boolean;
};
const mapStateToPropsForRedirect = (
  state: RootReducersType
): MapStateToPropsWithRedirectType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export function withAuthRedirect<T>(Component: ComponentType<T>) {
  // class RedirectComponent extends React.Component{
  //    render(){
  //       if (!this.props.isAuth) return <Redirect to={"/login"} />;
  //       return <Component {...this.props}/>
  //    }
  // }

  const RedirectComponent = (props: MapStateToPropsWithRedirectType) => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"} />;
    return <Component {...(restProps as T)} />;
  };

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
}
