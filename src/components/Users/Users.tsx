import axios from "axios";
import React from "react";
import s from "./Users.module.css";
import { UserPropsType } from "./UsersContainer";
import userPhoto from "../../assest/imagesUsersPage/userPhoto.png";
import { UsersPropsType } from "../../redux/users-reducer";

class Users extends React.Component<UserPropsType, UsersPropsType> {
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

  createPages = (
    pages: Array<number>, //массив со страницами
    pagesCount: number, //количество стр
    currentPage: number //текущая
  ) => {
    if (pagesCount > 10) {
      if (currentPage > 5) {
        for (let i = currentPage - 4; i <= currentPage + 5; i++) {
          pages.push(i);
          if (i == pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 10; i++) {
          pages.push(i);
          if (i == pagesCount) break;
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
      }
    }
  };

  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    let pages:Array<number> = [];
    // for (let i = 1; i <= pagesCount; i++) {
    //   pages.push(i);
    // }

    this.createPages(pages, pagesCount, this.props.currentPage);

    return (
      <div>
        <div className={s.numberPage}>
          {pages.map((p) => (
            <span
              className={
                this.props.currentPage === p ? s.selectPage : s.buttonPage
              }
              onClick={() => this.onPageChanged(p)}
            >
              {p}
            </span>
          ))}
        </div>
        {this.props.users.map((el) => (
          <div key={el.id}>
            <span>
              <div>
                <img
                  src={el.photos.small != null ? el.photos.small : userPhoto}
                  className={s.userPhoto}
                  alt={"avatar"}
                />
              </div>
              <div>
                {el.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(el.id);
                    }}
                  >
                    {" "}
                    Unfollow{" "}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(el.id);
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
}

export default Users;
