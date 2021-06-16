import React from "react";
import { ProfileUserPropsType } from "../../../redux/profile-reducer";
import { Preloader } from "../../OtherInterface/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoPrposType = {
  profile: ProfileUserPropsType | null;
  status: string;
  updateStatus: (status: string) => void;
};

function ProfileInfo(props: ProfileInfoPrposType) {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div className={s.imgProfile}>
        <img src="https://bipbap.ru/wp-content/uploads/2017/08/16.jpg" alt="" />
      </div> */}

      <div className={s.descriptionBlok}>
        <img src={props.profile.photos.large} className={s.avatarProfileUser} />
        <div>
          STATUS: <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
        <div>!</div>
        <div>fullName: {props.profile.fullName}</div>
        <div>aboutMe: {props.profile.aboutMe}</div>
        <div>
          <p>contacts:</p>
          <div>facebook: {props.profile.contacts.facebook}</div>
          <div> website: {props.profile.contacts.website}</div>
          <div>vk: {props.profile.contacts.vk}</div>
          <div>twitter: {props.profile.contacts.twitter}</div>
          <div> instagram: {props.profile.contacts.instagram}</div>
          <div>youtube: {props.profile.contacts.youtube}</div>
          <div>github: {props.profile.contacts.github}</div>
          <div> mainLink: {props.profile.contacts.mainLink}</div>
        </div>
        <div>lookingForAJob: {props.profile.lookingForAJob}</div>
        <div>
          lookingForAJobDescription: {props.profile.lookingForAJobDescription}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
