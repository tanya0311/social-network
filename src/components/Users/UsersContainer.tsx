
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootReducersType } from "../../redux/redux-store";
import { followAC, setUsersAC, unfollowAC, UsersPropsType } from "../../redux/users-reducer";
import Users from "./Users";


type MapStateToPropsType = {
  users: Array<UsersPropsType>
};
type MapDispathToPropsType = {
  follow:(userID: string) =>void
  unfollow:(userID: string) => void
  setUsers:(users: Array<UsersPropsType>) =>void
};

export type UserPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType):MapStateToPropsType => {
  return {
    users: state.userPage.users
  };
};
const mapDispathToProps = (dispatch: Dispatch):MapDispathToPropsType=> {
  
  return {
    follow:(userID: string) => {
      
      dispatch(followAC(userID));
    },
    unfollow:(userID: string) => {
      dispatch(unfollowAC(userID));
    },
    setUsers:(users: Array<UsersPropsType>) => {
      dispatch(setUsersAC(users));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispathToProps)(Users);

export default UsersContainer;



