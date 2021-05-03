import React from "react";
import s from "./sidebarItem.module.css";

type SidebarItemType = {
  nameUser: string;
  id:string
};

function SidebarItem(props: SidebarItemType) {
 
  return (
    <div className={s.sidebarUser}>
      <img
        src="https://click-or-die.ru/wp-content/uploads/2020/06/1-383x680.jpg"
        alt=""
      />
      <p>{props.nameUser}</p>
    </div>
  );
}

export default SidebarItem;
