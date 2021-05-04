import React from "react";
import s from "./MyPost.module.css";
import { MyPostPropsType } from "./MyPostContainer";
import Post from "./Post/Post";

function MyPost(props: MyPostPropsType) {
  let posts = props.PostData.map((e) => (
    <Post key={e.id} message={e.message} likeCount={e.likeCount} />
  ));

  let newPostElement = React.createRef<HTMLTextAreaElement>();

  function addPost() {
    props.addPost();
  }

  function onPostChange() {
    // debugger
    let newText = newPostElement.current?.value;
    if (newText) {
      props.updateNewPostText(newText);
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
