import React from "react";
import { connect } from "react-redux";
import {
  initialStatePropsType,
  sentMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/dialog-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Dialog from "./Dialogs";
import { Dispatch } from "redux";
import { Redirect } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/AuthRedirect";

type MapStateToPropsType = {
  state1: initialStatePropsType;
  // isAuth:boolean
};
type MapDispathToPropsType = {
  updateNewMessage: (body: string) => void;
  addMessageText: () => void;
};
export type DialogPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    state1: state.dialogPage,
    // isAuth: state.auth.isAuth
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  // debugger
  return {
    updateNewMessage: (body: string) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    addMessageText: () => {
      dispatch(sentMessageCreator());
    },
  };
};
let AuthRedirectComponent = withAuthRedirect(Dialog);

// const DialogsContainer = connect(mapStateToProps, mapDispathToProps)(Dialog);
const DialogsContainer = connect(
  mapStateToProps,
  mapDispathToProps
)(AuthRedirectComponent);

export default DialogsContainer;
