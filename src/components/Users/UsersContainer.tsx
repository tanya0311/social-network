import React from "react";
import { connect } from "react-redux";
import { RootReducersType } from "../../redux/redux-store";
import {
  followTC,
  setCurrentPage,
  unfollowTC,
  UsersPropsType,
  toggleFollowingInProgress,
  getUsersThunkCreator,
} from "../../redux/users-reducer";
import Users from "./Users";
import { Preloader } from "../OtherInterface/Preloader/Preloader";
import { compose } from "redux";
import { GetCurrentPage, GetFollowingInProgress, GetIsFetching, GetPageSize, GetTotalUsersCount, GetUsers } from "../../redux/users-selectors";

type MapStateToPropsType = {
  users: Array<UsersPropsType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};
type MapDispathToPropsType = {
  followTC: (userID: number) => void;
  unfollowTC: (userID: number) => void;
  setCurrentPage: (newPage: number) => void;
  toggleFollowingInProgress: (isFetching: boolean, id: number) => void;
  getUsersThunkCreator: (currentPage: number, pageSize: number) => void;
};

export type UserPropsType = MapStateToPropsType & MapDispathToPropsType;

class UsersContainer extends React.Component<UserPropsType, UsersPropsType> {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }
  onPageChanged = (pageNumber: number) => {
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
        />
        {/* <Users {...this.props} onPageChanged={this.onPageChanged} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    users: GetUsers(state),
    pageSize: GetPageSize(state),
    totalUsersCount: GetTotalUsersCount(state),
    currentPage: GetCurrentPage(state),
    isFetching: GetIsFetching(state),
    followingInProgress: GetFollowingInProgress(state),
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(
    mapStateToProps,
    {
      followTC,
      unfollowTC,
      setCurrentPage,
      toggleFollowingInProgress,
      getUsersThunkCreator,
    }
  )
)(UsersContainer);
