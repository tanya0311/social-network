import React from "react";

import s from "./MessageItem.module.css";

export type MessageItemProps = {
  id: string;
  text: string;
};
function MessageItem(props: MessageItemProps) {
  return (
    <div className={s.messageItem}>
      <div className={s.message} id={props.id}>
        {props.text}
      </div>
      <div className={s.message} id={props.id}>
        {props.text}
        
      </div>
      
    </div>
  );
}
export default MessageItem;
