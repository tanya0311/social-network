import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { AuthPropsType } from "./HeaderContainer";


type HeaderPropsType = {
	isAuth: boolean
	login: string | null
}

// function Header(props: AuthPropsType) {
function Header(props: HeaderPropsType) {
  return (
    <header className={s.header}>
      <img
        src="https://i.pinimg.com/736x/2d/dc/25/2ddc25914e2ae0db5311ffa41781dda1.jpg"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? <div>{props.login} hello </div>  : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;
