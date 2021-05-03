import React, { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { sentMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialog-reducer";
import {
  ActionType,
  MessagePageProps,
} from "../../redux/state";
import { PostPropsType } from "../Profile/MyPost/Post/Post";
import DialogItem, { DialogItemProps } from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import MessageItem, { MessageItemProps } from "./MessageItem /MessageItem";


export type DialogPropsType = {
  state1: MessagePageProps;
  dispatch: (action: ActionType) => void;
};

function Dialog(props: DialogPropsType) {
  let dialogsElement = props.state1.dialogsData.map((e) => (
    <DialogItem name={e.name} id={e.id} />
  ));

  let messageElement = props.state1.messageData.map((e) => (
    <MessageItem text={e.text} id={e.id} />
  ));

  let addMessageText = () => {
    props.dispatch(sentMessageCreator());
  };
  let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let body = e.currentTarget.value;
    props.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogsElement}</div>

      <div className={s.messages}>
        <div>{messageElement}</div>

        <div className={s.dialogAnswer}>
          <textarea
            value={props.state1.newMessageBody}
            onChange={onNewMessageChange}
          ></textarea>
          <button onClick={addMessageText}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
