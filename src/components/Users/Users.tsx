import React from "react";
import s from "./Users.module.css";
import { UsersPropsType } from "../../redux/users-reducer";
import userPhoto from "../../assest/imagesUsersPage/userPhoto.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

type UsersType = {
  users: Array<UsersPropsType>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  unfollow: (userID: number) => void;
  follow: (userID: number) => void;
  onPageChanged: (pageNumber: number) => void;
};

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
                  onClick={() => {
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/${el.id}`,
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(el.id);
                        }
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${el.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(el.id);
                        }
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
