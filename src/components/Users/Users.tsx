import React from "react"
import s from "./Users.module.css"
import { UsersPropsType } from "../../redux/users-reducer"
import userPhoto from "../../assest/imagesUsersPage/userPhoto.png"
import { NavLink } from "react-router-dom"
import { Paginator } from "../OtherInterface/Paginator/Paginator"
import User from "./User"

type UsersType = {
	users: Array<UsersPropsType>
	totalUsersCount: number
	pageSize: number
	currentPage: number
	unfollow: (userID: number) => void
	follow: (userID: number) => void
	onPageChanged: (pageNumber: number) => void
	followingInProgress: number[]
}

function Users(props: UsersType) {
	return (
		<div>
			<Paginator
				currentPage={props.currentPage}
				totalUsersCount={props.totalUsersCount}
				pageSize={props.pageSize}
				onPageChanged={props.onPageChanged}
			/>

			{props.users.map((el) => (
				<User
					key={el.id}
					user={el}
					unfollow={props.unfollow}
					follow={props.follow}
					followingInProgress={props.followingInProgress}
				/>
			))}
		</div>
	)
}

export default Users
