// import * as axios from "axios"; // 
import  axios from "axios";
import React from "react";
import s from "./Users.module.css";
import { UserPropsType } from "./UsersContainer";
import userPhoto from "../../assest/imagesUsersPage/userPhoto.png";


function Users(props: UserPropsType  ) {
  
if (props.users.length === 0){
  axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response=>{ 
    props.setUsers(response.data.items )
  });
  
}

  return (
    <div>
      {props.users.map((el) => (
        <div key={el.id}>
          <span>
            <div>
              <img src={el.photos.small !=null ? el.photos.small :  userPhoto } className={s.userPhoto} alt={"avatar"} />
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
              <div>{'el.location.country'}</div>
              <div>{'el.location.city'}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Users;



// {
//   id: "1u",
//   followed: true,
//   name: "Ana",
//   photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWU2R4OlgX8OXZon0OT4lRsQttb9XaZX3Ug&usqp=CAU',
//   status: "hello world",
//   location: { country: "Belarus", city: "Minsk" },
// },
// {
//   id: "2u",
//   followed: false,
//   name: "Gleb",
//   photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTygNZj-_qkSsq3iucBBvqQPKQDJ-72E6o9T_dSiwMrzWHcu4KadOlxSLXGVVfZ8mYO1ec&usqp=CAU',
//   status: "hello world",
//   location: { country: "Poland", city: "Krakov" },
// },
// {
//   id: "3u",
//   followed: true,
//   name: "Nikita",
//   photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqN2ZnsPBr6i9jG4EAKDoFQR8x4Qfuodf5xup4iTygjI8-dgQ2f2DH3sa3cGAOn2FQvg&usqp=CAU',
//   status: "hello world",
//   location: { country: "Belarus", city: "Minsk" },
// }
