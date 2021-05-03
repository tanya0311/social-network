import React from "react";
import s from "./Post.module.css";

 export type PostPropsType={
  message:string
  likeCount:number
  id?:string
}

function Post(props: PostPropsType) {
  // debugger
  return (
    <div className={s.item}>
      <img 
      // className={s.imgPost}
        src="https://i.pinimg.com/originals/f7/0f/82/f70f827e33a61a247663e7aeb282f895.jpg"
        alt=""
      />
      {props.message}
      <p>
      <span>Like: </span> {props.likeCount}</p>
    </div>
  )
}

export default Post;
