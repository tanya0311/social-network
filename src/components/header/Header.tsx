import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { AuthPropsType } from "./HeaderContainer";

type HeaderPropsType = {
  // email:null | string;
  isAuth: boolean;
  login: string | null;
  logoutTC: () => void;
};

// function Header(props: AuthPropsType) {
function Header(props: HeaderPropsType) {
  const LogoutHamdler = () => {
    // alert('by')
  };
  return (
    <header className={s.header}>
      <img
        src="https://i.pinimg.com/736x/2d/dc/25/2ddc25914e2ae0db5311ffa41781dda1.jpg"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            hello: {props.login}{" "}
            <button onClick={props.logoutTC}> Logout </button>{" "}
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
