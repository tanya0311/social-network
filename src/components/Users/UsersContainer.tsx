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
} from "../../redux/users-reducer";
import Users from "./Users";
import { Preloader } from "../OtherInterface/Preloader/Preloader";

type MapStateToPropsType = {
  users: Array<UsersPropsType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
};
type MapDispathToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: Array<UsersPropsType>) => void;
  setCurrentPage: (newPage: number) => void;
  setUsersTotalCount: (totalCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
};

export type UserPropsType = MapStateToPropsType & MapDispathToPropsType;

class UsersContainer extends React.Component<UserPropsType, UsersPropsType> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setUsersTotalCount(response.data.totalCount);
      });
  }
  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
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
        />
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
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  // other
  setCurrentPage: setCurrentPage,
  setUsersTotalCount: setUsersTotalCount,
  toggleIsFetching: toggleIsFetching,
})(UsersContainer);
