import React from "react"
import s from "./Users.module.css"
import { UsersPropsType } from "../../redux/users-reducer"
import { NavLink } from "react-router-dom"
import { UserAvatar } from "../OtherInterface/UserAvatar/UserAvatar"

type UserType = {
	user: UsersPropsType
	unfollow: (userID: number) => void
	follow: (userID: number) => void
	followingInProgress: number[]
}

function User(props: UserType) {
	let user = props.user

	return (
		<div>
			<span>
				<div>
					<NavLink to={"/profile/" + user.id}>
						<div className={s.userPhoto}>
							<UserAvatar photos={props.user.photos} />
						</div>
					</NavLink>
				</div>
				<div>
					{user.followed ? (
						<button
							disabled={props.followingInProgress.some((id) => id === user.id)}
							onClick={() => {
								props.unfollow(user.id)
							}}
						>
							Unfollow
						</button>
					) : (
						<button
							disabled={props.followingInProgress.some((id) => id === user.id)}
							onClick={() => {
								props.follow(user.id)
							}}
						>
							Follow
						</button>
					)}
				</div>
			</span>
			<span>
				<span>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</span>
				<span>
					<div>{"el.location.country"}</div>
					<div>{"el.location.city"}</div>
				</span>
			</span>
		</div>
	)
}

export default User
