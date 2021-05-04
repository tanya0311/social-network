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

type MapStateToPropsType = {
  state1: initialStatePropsType;
};
type MapDispathToPropsType = {
  updateNewMessage: (body: string) => void;
  addMessageText: () => void;
};
export type DialogPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    state1: state.dialogPage,
  };
};
const mapDispathToProps = (dispatch: Dispatch):MapDispathToPropsType => {
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
const DialogsContainer = connect(mapStateToProps, mapDispathToProps)(Dialog);

export default DialogsContainer;
