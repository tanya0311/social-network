import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPost/MyPostContainer";
import { ProfileUserPropsType } from "../../redux/profile-reducer";

type ProfilePropsType = {
  profile: ProfileUserPropsType | null;
  status:string
  updateStatus:(status:string) => void;
};

function Profile(props: ProfilePropsType) {
  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostContainer />
    </div>
  );
}

export default Profile;
