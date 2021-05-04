import React from "react";
import { NameUserProps } from "../../../redux/sidebar-reducer";
import s from "./sidebar.module.css";
import SidebarItem from "./sidebarItem/sidebarItem";

type SidebarType = {
  title: string;
  nameUser: Array<NameUserProps>;
};

function Sidebar(props: SidebarType) {
  let nameUserItem = props.nameUser.map((e) => (
    <SidebarItem nameUser={e.name} id={e.id} />
  ));
  return (
    <div>
      <h3>{props.title}</h3>
      <div className={s.sidebarItem}>{nameUserItem}</div>
    </div>
  );
}

export default Sidebar;
