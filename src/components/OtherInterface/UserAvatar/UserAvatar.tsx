import React from "react"
import { PhotosType } from "../../../redux/users-reducer"
import userPhoto from "../../../assest/imagesUsersPage/userPhoto.png"

type UserAvatarType = {
	photos: PhotosType
}
export const UserAvatar = (props: UserAvatarType) => {
	return <img src={props.photos.large || userPhoto} alt={"avatar"} />
}


// src={user.photos.small != null ? user.photos.small : userPhoto}