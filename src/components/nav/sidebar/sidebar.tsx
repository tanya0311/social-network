import React from "react";
import { NavPropsType } from "../NavContainer";
import s from "./sidebar.module.css";
import SidebarItem from "./sidebarItem/sidebarItem";

function Sidebar(props: NavPropsType) {
  let nameUserItem = props.nameUser.map((e) => (
    <SidebarItem key={e.id} nameUser={e.name} id={e.id} />
  ));
  return (
    <div>
      <h3>{props.title}</h3>
      <div className={s.sidebarItem}>{nameUserItem}</div>
    </div>
  );
}

export default Sidebar;
