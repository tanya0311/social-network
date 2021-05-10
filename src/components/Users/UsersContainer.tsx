import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootReducersType } from "../../redux/redux-store";
import {
  followAC,
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC,
  unfollowAC,
  UsersPropsType,
} from "../../redux/users-reducer";
import Users from "./Users";

type MapStateToPropsType = {
  users: Array<UsersPropsType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
};
type MapDispathToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: Array<UsersPropsType>) => void;
  setCurrentPage: (newPage: number) => void;
  setUsersTotalCount: (totalCount: number) => void;
};

export type UserPropsType = MapStateToPropsType & MapDispathToPropsType;

class UsersContainer extends React.Component<UserPropsType, UsersPropsType> {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setUsersTotalCount(response.data.totalCount);
      });
  }
  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        // this.props.setUsersTotalCount(response.data.totalCount);
      });
  };

  render() {
    return (
      <Users
        users={this.props.users}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
        onPageChanged={this.onPageChanged}
      />
    );
  }
}

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    users: state.userPage.users,
    pageSize: state.userPage.pageSize,
    totalUsersCount: state.userPage.totalUsersCount,
    currentPage: state.userPage.currentPage,
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  return {
    follow: (userID: number) => {
      dispatch(followAC(userID));
    },
    unfollow: (userID: number) => {
      dispatch(unfollowAC(userID));
    },
    setUsers: (users: Array<UsersPropsType>) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (newPage: number) => {
      dispatch(setCurrentPageAC(newPage));
    },
    setUsersTotalCount: (totalCount: number) => {
      dispatch(setUsersTotalCountAC(totalCount));
    },
  };
};

// const UsersContainer1 = connect(
//   mapStateToProps,
//   mapDispathToProps
// )(UsersApiComponent);

export default connect(mapStateToProps, mapDispathToProps)(UsersContainer);
