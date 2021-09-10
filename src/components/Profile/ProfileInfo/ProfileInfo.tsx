import React, { ChangeEvent, useState } from "react"
import {
	ProfileUserPropsType,
} from "../../../redux/profile-reducer"
import { Preloader } from "../../OtherInterface/Preloader/Preloader"
import s from "./ProfileInfo.module.css"
import ProfileStatusWhithHooks from "./ProfileStatusWhithHook"
import { UserAvatar } from "../../OtherInterface/UserAvatar/UserAvatar"
import ProfileDataForm from "./ProfileDataForm"
import ProfileData from "./ProfileData"

type ProfileInfoPropsType = {
	profile: ProfileUserPropsType | null
	status: string
	updateStatus: (status: string) => void
	isOwner: boolean
	savePhoto: (file: File) => void
  saveProfile:(formData:ProfileUserPropsType)=>void
}

function ProfileInfo(props: ProfileInfoPropsType) {
	const [editMode, setEditMode] = useState<boolean>(false)

	if (!props.profile) {
		return <Preloader />
	}
	const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			props.savePhoto(e.target.files[0])
		}
	}

  const onSubmit = (formData:ProfileUserPropsType) => {
    props.saveProfile(formData)
    // .then(
    //     () => {
    //         setEditMode(false);
    //     }
    // );
    console.log(formData)
}
	return (
		<div>
			<div className={s.descriptionBlok}>
				<div className={s.avatarProfileUser}>
					<UserAvatar photos={props.profile.photos} />
					{props.isOwner && (
						<input type='file' onChange={onMainPhotoSelector} />
					)}
				</div>

				<div>
					STATUS:
					<ProfileStatusWhithHooks
						status={props.status}
						updateStatus={props.updateStatus}
					/>
				</div>
				{editMode ? (
					<ProfileDataForm profile={props.profile} onSubmit={onSubmit} />
				) : (
					<ProfileData profile={props.profile} isOwner={props.isOwner} editModeCallback={()=>setEditMode(true) } />
				)}
			</div>
		</div>
	)
}





export default ProfileInfo
