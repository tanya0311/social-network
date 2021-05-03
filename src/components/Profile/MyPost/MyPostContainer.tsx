import React from "react";
import {
  addPostActionCreator,
  onPostChangeAC,
} from "../../../redux/profile-reducer";
import { ActionType } from "../../../redux/state";
import MyPost from "./MyPost";

import { PostPropsType } from "./Post/Post";

type MyPostPropsType = {
  PostData: Array<PostPropsType>;
  newPostText: string;
  dispatch: (action: ActionType) => void;
};

// type MyPostPropsType = {
//  store:
// };

function MyPostContainer(props: MyPostPropsType) {
  function AddPost() {
    props.dispatch(addPostActionCreator());
  }

  function OnPostChange(newText: string) {
    props.dispatch(onPostChangeAC(newText));
  }

  return <MyPost updateNewPostText={OnPostChange} addPost={AddPost} PostData={props.PostData} newPostText={props.newPostText} />;
}

export default MyPostContainer;

