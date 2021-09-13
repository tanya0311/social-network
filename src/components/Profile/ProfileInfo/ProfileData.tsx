import { ContactsType, ProfileUserPropsType } from "../../../redux/profile-reducer"
import React from "react"
import Contact from "./Contact"

type ProfileDataPropsType = {
	profile: ProfileUserPropsType 
	isOwner: boolean 
  editModeCallback:()=>void
}

const ProfileData = (props: ProfileDataPropsType) => {
	return (
		<div>
			{props.isOwner && (
				<div>
					<button onClick={props.editModeCallback}>Edit</button>
				</div>
			)}
			<div>
				<b>Full name:</b> <span>{props.profile.fullName}</span>
			</div>

			<div>
				<b>About me: </b> <span>{props.profile.aboutMe}</span>
			</div>
			<div>
				<b>Looking for a job:</b> <span>{props.profile.lookingForAJob}</span>
			</div>
			{props.profile.lookingForAJob && (
				<div>
					<b> My skills:</b>
					<span> {props.profile.lookingForAJobDescription}</span>
				</div>
			)}

			<div>
				<b>Contacts:</b>
				{Object.keys(props.profile.contacts).map((key) => (
					<Contact
						contactTitle={key}
						contactValue={props.profile.contacts[key as keyof ContactsType]}
					/>
				))}
			</div>
		</div>
	)
}

export default ProfileData