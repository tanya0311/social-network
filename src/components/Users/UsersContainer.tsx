import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { RootReducersType } from "../../redux/redux-store";
import {
  followTC,
  setCurrentPage,
  setUsers,
  setUsersTotalCount,
  toggleIsFetching,
  unfollowTC,
  UsersPropsType,
  toggleFollowingInProgress,
  getUsersThunkCreator
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
  followTC: (userID: number) => void;
  unfollowTC: (userID: number) => void;
  // setUsers: (users: Array<UsersPropsType>) => void;
  setCurrentPage: (newPage: number) => void;
  // setUsersTotalCount: (totalCount: number) => void;
  // toggleIsFetching: (isFetching: boolean) => void;
  toggleFollowingInProgress: (isFetching: boolean, id: number) => void;
  getUsersThunkCreator: (currentPage:number, pageSize:number)=>void;
};

export type UserPropsType = MapStateToPropsType & MapDispathToPropsType;

class UsersContainer extends React.Component<UserPropsType, UsersPropsType> {
  componentDidMount() {
    // debugger
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }
  onPageChanged = (pageNumber: number) => {
    // this.props.setCurrentPage(pageNumber);

    this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
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
          unfollow={this.props.unfollowTC}
          follow={this.props.followTC}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
          // toggleFollowingInProgress={this.props.toggleFollowingInProgress}
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
  followTC,
  unfollowTC,
  // setUsers,
  setCurrentPage,
  // setUsersTotalCount,
  // toggleIsFetching,
  toggleFollowingInProgress,
  getUsersThunkCreator,
})(UsersContainer);
