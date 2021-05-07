import axios from "axios";
import React from "react";
import s from "./Users.module.css";
import { UserPropsType } from "./UsersContainer";
import userPhoto from "../../assest/imagesUsersPage/userPhoto.png";

class Users extends React.Component<UserPropsType> {
  componentDidMount(){
    if (this.props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          this.props.setUsers(response.data.items);
        });
    }
  }
  render() {
    return (
      <div>
  
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
    )
  }
}

export default Users;
