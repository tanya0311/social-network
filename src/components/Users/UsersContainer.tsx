import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { RootReducersType } from "../../redux/redux-store";
import {
  follow,
  setCurrentPage,
  setUsers,
  setUsersTotalCount,
  toggleIsFetching,
  unfollow,
  UsersPropsType,
  toggleFollowingInProgress,
} from "../../redux/users-reducer";
import Users from "./Users";
import { Preloader } from "../OtherInterface/Preloader/Preloader";
import { getUsersApi } from "../../api/API";

type MapStateToPropsType = {
  users: Array<UsersPropsType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  // followingInProgress: boolean;
  followingInProgress: number[];
};
type MapDispathToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: Array<UsersPropsType>) => void;
  setCurrentPage: (newPage: number) => void;
  setUsersTotalCount: (totalCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  toggleFollowingInProgress: (isFetching: boolean, id: number) => void;
};

export type UserPropsType = MapStateToPropsType & MapDispathToPropsType;

class UsersContainer extends React.Component<UserPropsType, UsersPropsType> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    // getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
    getUsersApi
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setUsersTotalCount(data.totalCount);
      });
  }
  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    getUsersApi.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
      // this.props.setUsersTotalCount(response.data.totalCount);
    });
  };

  render() {
    return (
      <div>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
          toggleFollowingInProgress={this.props.toggleFollowingInProgress}
        />
        {/* <Users {...this.props} onPageChanged={this.onPageChanged} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    users: state.userPage.users,
    pageSize: state.userPage.pageSize,
    totalUsersCount: state.userPage.totalUsersCount,
    currentPage: state.userPage.currentPage,
    isFetching: state.userPage.isFetching,
    followingInProgress: state.userPage.followingInProgress,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispathToPropsType,
  {},
  RootReducersType
>(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setUsersTotalCount,
  toggleIsFetching,
  toggleFollowingInProgress,
})(UsersContainer);
