import React from "react";
import MyPost from "./MyPost/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "./Profile.module.css";
import { PostPropsType } from "./MyPost/Post/Post";
import { ActionType, ProfilePageProps } from "../../redux/state";
import MyPostContainer from "./MyPost/MyPostContainer";

type ProfilePropsType = {
  state1: ProfilePageProps;
  dispatch: (action: ActionType) => void;
};
function Profile(props: ProfilePropsType) {
  return (
    <div>
      <ProfileInfo />
      <MyPostContainer
        PostData={props.state1.PostData}
        newPostText={props.state1.newPostText}
        dispatch={props.dispatch}
      />
      {/* <MyPostContainer store={props.store}/> */}

      {/* <MyPost PostData={props.state1.PostData}  newPostText={props.state1.newPostText} dispatch={props.dispatch}
      // addPost={props.addPost} updateNewPost={props.updateNewPost}
      /> */}
    </div>
  );
}

export default Profile;
