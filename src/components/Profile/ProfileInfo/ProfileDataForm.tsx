import {
	ContactsType,
	ProfileUserPropsType,
} from "../../../redux/profile-reducer"
import React from "react"
import Contact from "./Contact"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { Input, Textarea } from "../../OtherInterface/FormsControls/FormControl"
import { required } from "../../../utils/validators/validators"
import s from "./ProfileDataForm.module.css"
import style from "./../../OtherInterface/FormsControls/FormControl.module.css"

type ProfileDataFormPropsType = {
	profile: ProfileUserPropsType 
	onSubmit: (formData:ProfileUserPropsType)=>void
	error?:any
}

const ProfileDataForm = (
	props: InjectedFormProps<ProfileUserPropsType, ProfileDataFormPropsType> &
		ProfileDataFormPropsType
) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<div>
					<button>Save</button>
				</div>
				{props.error && <div className={style.formError}>{props.error}</div>}
				<div>
					<b>Full name:</b>
					{
						<Field
							placeholder={"Full name"}
							name={"fullName"}
							component={Input}
							validate={[required]}
						/>
					}
				</div>

				<div>
					<b>About me: </b>
					{
						<Field
							placeholder={"About me"}
							name={"aboutMe"}
							component={Input}
							validate={[required]}
						/>
					}
				</div>
				<div>
					<b>Looking for a job:</b>
					{
						<Field
							placeholder={""}
							name={"lookingForAJob"}
							component={Input}
							type='checkbox'
							// validate={[required]}
						/>
					}
				</div>

				<div>
					<b> My skills:</b>{" "}
					<Field
						placeholder={"My skills"}
						name={"lookingForAJobDescription"}
						component={Textarea}
						validate={[required]}
					/>
				</div>
			</div>

			<div>
				<b>Contacts:</b>
				{Object.keys(props.profile.contacts).map((key) => {
					return <div  key={key} className={s.contact}>
						<b>{key}:<Field
						placeholder={key}
						name={"contacts."+key}
						component={Textarea}
						// validate={[required]}
					/></b>
					</div>
				}
				// (
				// 	<Contact
				// 		contactTitle={key}
				// 		contactValue={props.profile.contacts[key as keyof ContactsType]}
				// 	/>
				
				// )
				)}
			</div>
		</form>
	)
}

const ProfileDataFormReduxForm = reduxForm<
	ProfileUserPropsType,
	ProfileDataFormPropsType
>({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataFormReduxForm
