import React from "react";
import s from "./Users.module.css";
import { UsersPropsType } from "../../redux/users-reducer";
import userPhoto from "../../assest/imagesUsersPage/userPhoto.png";
import { NavLink } from "react-router-dom";
import { followApi, unFollowApi } from "../../api/API";
import { UserPropsType } from "./UsersContainer";

type UsersType = {
  users: Array<UsersPropsType>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  unfollow: (userID: number) => void;
  follow: (userID: number) => void;
  onPageChanged: (pageNumber: number) => void;
  // followingInProgress: boolean;
  followingInProgress: number[];
  toggleFollowingInProgress: (isFetching: boolean, id: number) => void;
};
type UsersType2 = {
  onPageChanged: (pageNumber: number) => void;
};
// for {/* <Users {...this.props} onPageChanged={this.onPageChanged} /> */}
// function Users(props: UsersType2 & UserPropsType) {

function Users(props: UsersType) {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages: Array<number> = [];
  // for (let i = 1; i <= pagesCount; i++) {
  //   pages.push(i);
  // }

  const createPages = (
    pages: Array<number>, //массив со страницами
    pagesCount: number, //количество стр
    currentPage: number //текущая
  ) => {
    if (pagesCount > 10) {
      if (currentPage > 5) {
        for (let i = currentPage - 4; i <= currentPage + 5; i++) {
          pages.push(i);
          if (i === pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 10; i++) {
          pages.push(i);
          if (i === pagesCount) break;
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
      }
    }
  };

  createPages(pages, pagesCount, props.currentPage);
  return (
    <div>
      <div className={s.numberPage}>
        {pages.map((p) => (
          <span
            className={props.currentPage === p ? s.selectPage : s.buttonPage}
            onClick={() => props.onPageChanged(p)}
          >
            {p}
          </span>
        ))}
      </div>
      {props.users.map((el) => (
        <div key={el.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + el.id}>
                <img
                  src={el.photos.small != null ? el.photos.small : userPhoto}
                  className={s.userPhoto}
                  alt={"avatar"}
                />
              </NavLink>
            </div>
            <div>
              {el.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === el.id
                  )}
                  onClick={() => {
                    props.toggleFollowingInProgress(true, el.id);
                    unFollowApi.unFollow(el.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unfollow(el.id);
                      }
                      props.toggleFollowingInProgress(false, el.id);
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === el.id
                  )}
                  onClick={() => {
                    props.toggleFollowingInProgress(true, el.id);
                    followApi.follow(el.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.follow(el.id);
                      }
                      props.toggleFollowingInProgress(false, el.id);
                    });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{el.name}</div>
              <div>{el.status}</div>
            </span>
            <span>
              <div>{"el.location.country"}</div>
              <div>{"el.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Users;
