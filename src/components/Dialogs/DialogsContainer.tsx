import React from "react";
import { connect } from "react-redux";
import {
  initialStatePropsType,
  sentMessageCreator,
  // updateNewMessageBodyCreator,
} from "../../redux/dialog-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Dialog from "./Dialogs";
import { compose, Dispatch } from "redux";
import { withAuthRedirect } from "../../hoc/AuthRedirect";

type MapStateToPropsType = {
  state1: initialStatePropsType;
};
type MapDispathToPropsType = {
  // updateNewMessage: (body: string) => void;
  addMessageText: (newMessageBody: string) => void;
};
export type DialogPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    state1: state.dialogPage,
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  return {
    // updateNewMessage: (body: string) => {
    //   dispatch(updateNewMessageBodyCreator(body));
    // },
    //!  )))))))))))
    addMessageText: (newMessageBody: string) => {
      dispatch(sentMessageCreator(newMessageBody));
    },
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(
    mapStateToProps,
    mapDispathToProps
  ),
  withAuthRedirect
)(Dialog);
