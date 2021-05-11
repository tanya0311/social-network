import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPost/MyPostContainer";
import { ProfileUserPropsType } from "../../redux/profile-reducer";

type ProfilePropsType = {
  profile: ProfileUserPropsType | null;
};

function Profile(props: ProfilePropsType) {
  return (
    <div>
      <ProfileInfo profile={props.profile} />
      <MyPostContainer />
    </div>
  );
}

export default Profile;
