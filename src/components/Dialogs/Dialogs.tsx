import React, { ChangeEvent } from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import { DialogPropsType } from "./DialogsContainer";
import MessageItem from "./MessageItem /MessageItem";

function Dialog(props: DialogPropsType) {
  let dialogsElement = props.state1.dialogsData.map((e) => (
    <DialogItem name={e.name} id={e.id} />
  ));

  let messageElement = props.state1.messageData.map((e) => (
    <MessageItem text={e.text} id={e.id} />
  ));

  let addMessageText = () => {
    props.addMessageText();
  };
  let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let body = e.currentTarget.value;
    props.updateNewMessage(body);
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
