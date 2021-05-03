import React, { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { sentMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialog-reducer";
import {
  ActionType,
  MessagePageProps,
} from "../../redux/state";
import { PostPropsType } from "../Profile/MyPost/Post/Post";
import DialogItem, { DialogItemProps } from "./DialogItem/DialogItem";
import Dialog from "./Dialogs";
import s from "./Dialogs.module.css";
import MessageItem, { MessageItemProps } from "./MessageItem /MessageItem";


export type DialogPropsType = {
  state1: MessagePageProps;
  dispatch: (action: ActionType) => void;
};

function DialogsContainer(props: DialogPropsType) {
  
  let addMessageText = () => {
    props.dispatch(sentMessageCreator());
  };

  let onNewMessageChange = (body:string) => {
    props.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <Dialog updateNewMessage={onNewMessageChange} addMessageText={addMessageText} state1={props.state1}/>
  );
}

export default DialogsContainer;
