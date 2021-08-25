import { Dispatch } from "redux"
import { UsersApi } from "../api/API"
import { updateObjInArray } from "../utils/helper/helpers"
import { ThunkType } from "./redux-store"

let initialState: initialStatePropsType = {
	users: [],
	pageSize: 20,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	// followingInProgress: [17216,17215,17214], // убираем id пользователя а то кнопка будет зафиксирована в true и мы на нее не сможем нажать
	followingInProgress: [],
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS"

export const userReducer = (
	state: initialStatePropsType = initialState,
	action: UsersReducerActionType
): initialStatePropsType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjInArray (state.users, action.userID, 'id', {followed: true} )
        // 	users: state.users.map((u) =>
				// 	u.id === action.userID ? { ...u, followed: true } : u
				// ),
			}

		case UNFOLLOW:
			return {
				...state,
				users: state.users.map((u) =>
					u.id === action.userID ? { ...u, followed: false } : u
				),
			}

		case SET_USERS:
			return { ...state, users: action.users }

		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.currentPage }
		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.count }
		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching }
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter((id) => id !== action.userId),
			}

		default:
			return state
	}
}

//action
export const follow = (userID: number) => ({ type: FOLLOW, userID } as const)

export const unfollow = (userID: number) => {
	return { type: UNFOLLOW, userID } as const
}

export const setUsers = (users: Array<UsersPropsType>) => {
	return { type: SET_USERS, users } as const
}

export const setCurrentPage = (currentPage: number) => {
	return { type: SET_CURRENT_PAGE, currentPage } as const
}
export const setUsersTotalCount = (count: number) => {
	return { type: SET_TOTAL_USERS_COUNT, count } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
	return { type: TOGGLE_IS_FETCHING, isFetching } as const
}
export const toggleFollowingInProgress = (
	isFetching: boolean,
	userId: number
) => {
	return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const
}

//thunk
export const getUsersThunkCreator = (
	currentPage: number,
	pageSize: number
): ThunkType => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(currentPage))
		let data = await UsersApi.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setUsersTotalCount(data.totalCount))
	}
}

const followUnfollowFlow = async (
	dispatch: Dispatch<UsersReducerActionType>,
	id: number,
	apiMethod: (id: number) => Promise<any>,
	actionCreator: (id: number) => FollowACType | UnFollowACType
) => {
	dispatch(toggleFollowingInProgress(true, id))
	let data = await apiMethod(id)
	if (data.resultCode === 0) {
		dispatch(actionCreator(id))
	}
	dispatch(toggleFollowingInProgress(false, id))
}
export const followTC = (id: number): ThunkType => {
	return async (dispatch) => {
		let apiMethod = UsersApi.follow.bind(UsersApi)
		let actionCreator = follow
		followUnfollowFlow(dispatch, id, apiMethod, actionCreator)
	}
}
export const unfollowTC = (id: number): ThunkType => {
	return async (dispatch) => {
		let apiMethod = UsersApi.unFollow.bind(UsersApi)
		let actionCreator = unfollow
		followUnfollowFlow(dispatch, id, apiMethod, actionCreator)
	}
}

//type
export type PhotosType = {
	small: string | null
	large: string | null
}

export type UsersPropsType = {
	id: number
	followed: boolean
	name: string
	photos: PhotosType
	status: string
	location?: { country: string; city: string }
}

export type initialStatePropsType = {
	users: Array<UsersPropsType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: number[]
}

export type FollowACType = ReturnType<typeof follow>
export type UnFollowACType = ReturnType<typeof unfollow>

export type UsersReducerActionType =
	| FollowACType
	| UnFollowACType
	| ReturnType<typeof setUsers>
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof setUsersTotalCount>
	| ReturnType<typeof toggleIsFetching>
	| ReturnType<typeof toggleFollowingInProgress>
