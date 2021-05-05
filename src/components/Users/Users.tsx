import React from "react";
import s from "./Users.module.css";
import { UserPropsType } from "./UsersContainer";

function Users(props: UserPropsType) {
  
  return (
    <div>
      {props.users.map((el) => (
        <div key={el.id}>
          <span>
            <div>
              <img src={el.photoURL} className={s.userPhoto} alt={"avatar"} />
            </div>
            <div>
              {
              el.followed 
              ? <button onClick={() => { props.unfollow(el.id);}} > Unfollow </button> 
              :  <button onClick={() => { props.follow(el.id);}}>Follow</button>
              }
            </div>
          </span>
          <span>
            <span>
              <div>{el.name}</div>
              <div>{el.status}</div>
            </span>
            <span>
              <div>{el.location.country}</div>
              <div>{el.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Users;
