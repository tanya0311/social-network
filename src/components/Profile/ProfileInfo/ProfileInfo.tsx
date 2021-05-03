import React from "react";
import { PostPropsType } from "../MyPost/Post/Post";
import s from "./ProfileInfo.module.css";

type ProfileInfoPrposType={
  
}

function ProfileInfo(props:ProfileInfoPrposType) {
  return (
    <div>
      <div className={s.imgProfile}>
        <img src="https://bipbap.ru/wp-content/uploads/2017/08/16.jpg" alt="" />
      </div>
      <div className={s.descriptionBlok}>
        ava + info
      </div>
    </div>
  );
}


export default ProfileInfo;