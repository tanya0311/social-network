import React from "react";
import { addPostActionCreator, onPostChangeAC } from "../../../redux/profile-reducer";

import { ActionType } from "../../../redux/state";
import s from "./MyPost.module.css";
import Post, { PostPropsType } from "./Post/Post";

type MyPostPropsType = {
  PostData: Array<PostPropsType>;
  newPostText: string;
  dispatch: (action: ActionType) => void;
  // addPost: (textPost:string)=>void
  // updateNewPost:(newText: string)=>void
};



function MyPost(props: MyPostPropsType) {
  let posts = props.PostData.map((e) => (
    <Post key={e.id} message={e.message} likeCount={e.likeCount} />
  ));

  let newPostElement = React.createRef<HTMLTextAreaElement>();

  function addPost() {
    props.dispatch(addPostActionCreator());
    // debugger
    // let addText=newPostElement.current?.value
    // if (addText){
    //   props.dispatch({type: "ADD-POST", addText});

    // props.addPost(newPostElement.current?.value);
    // props.updateNewPost('')
  }

  function onPostChange() {
    // debugger
    let newText = newPostElement.current?.value;
    if (newText) {
      props.dispatch(onPostChangeAC(newText));
    }
  }

  return (
    <div>
      My post
      <div>
        <textarea
          ref={newPostElement}
          value={props.newPostText}
          onChange={onPostChange}
        ></textarea>
        <button onClick={addPost}>Add</button>
      </div>
      <div className={s.post}>{posts}</div>
    </div>
  );
}

export default MyPost;
