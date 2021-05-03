import React from "react";
import { NavLink } from "react-router-dom";
import { NameUserProps } from "../../redux/state";
import s from "./nav.module.css";
import Sidebar from "./sidebar/sidebar";


// export type NameUserProps = {
//   id: string;
//   name: string;
// };

type NavPropsType={
  nameUser:Array<NameUserProps>
}

function Nav(props: NavPropsType) {
 
 
  return (
    <div>
      <nav className={s.nav}>
        <div className={s.item} >
          <NavLink to='/profile' activeClassName={s.activLink}>Profile</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/dialogs' activeClassName={s.activLink}> Messages</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/news' activeClassName={s.activLink}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/music' activeClassName={s.activLink}>Music</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/settings' activeClassName={s.activLink}>Settings</NavLink>
        </div>
      </nav>
      <div>
        <Sidebar title='friends' nameUser={props.nameUser}/>
      </div>
    </div>
  );
}

export default Nav;



