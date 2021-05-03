import React from "react";
import { NavLink } from "react-router-dom";

import s from "./DialogItem.module.css";

export type DialogItemProps = {
  id: string;
  name: string;
};
function DialogItem(props: DialogItemProps) {
  return (
    <div className={s.dialog}>

      <NavLink to={"/dialogs/" + props.id} activeClassName={s.activLink}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiT-yyLmJNm-LFIkIuz04Wd-sOUYRrpt-bQ&usqp=CAU" alt=""/>
        {props.name}
      </NavLink>
    </div>
  );
}

export default DialogItem;
