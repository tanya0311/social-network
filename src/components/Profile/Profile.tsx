import React from "react";
import MyPost from "./MyPost/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "./Profile.module.css";
import { PostPropsType } from "./MyPost/Post/Post";
import { ActionType, ProfilePageProps } from "../../redux/state";

type ProfilePropsType={
  state1: ProfilePageProps
  // addPost: (textPost:string)=>void
  // updateNewPost:(newText: string)=>void
  dispatch:(action:ActionType)=>void
}
function Profile(props:ProfilePropsType) {

  
  // let posts=PostData.map(e=><Post id={e.id} message={e.message} likeCount={e.likeCount} />
  //   )
  
  
  return (
    <div>
      <ProfileInfo />
      <MyPost PostData={props.state1.PostData}  newPostText={props.state1.newPostText} dispatch={props.dispatch}
      // addPost={props.addPost} updateNewPost={props.updateNewPost}
      />
    </div>
  );
}

export default Profile;