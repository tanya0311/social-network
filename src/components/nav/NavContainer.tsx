import React from "react";
import { connect } from "react-redux";
import { RootReducersType } from "../../redux/redux-store";
import { NameUserProps } from "../../redux/sidebar-reducer";
import Sidebar from "./sidebar/sidebar";
import { Dispatch } from "redux";

type MapStateToPropsType = {
  title: string;
  nameUser:Array< NameUserProps>;
};
type MapDispathToPropsType = {};

export type NavPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType):MapStateToPropsType => {
  return {
    title: "friends",
    nameUser: state.sidebarPage.nameUser,
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  return {};
};
const NavContainer = connect(mapStateToProps, mapDispathToProps)(Sidebar);

export default NavContainer;
