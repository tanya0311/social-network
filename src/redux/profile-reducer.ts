import { ProfileApi } from "../api/API"
import { ThunkType } from "./redux-store"

export type PostDataProps = {
	id: string
	message: string
	likeCount: number
}
export type ContactsType = {
	facebook: string
	website: null
	vk: string
	twitter: string
	instagram: string
	youtube: null
	github: string
	mainLink: null
}
export type ProfileUserPropsType = {
	aboutMe: string
	contacts: ContactsType
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	userId: number
	photos: {
		small: string
		large: string
	}
}
export type addPostACType = ReturnType<typeof addPostAC>
export type deletePostACType = ReturnType<typeof deletePostAC>
export type setStatusACType = ReturnType<typeof setStatusAC>

export type ProfileReducerActionType =
	| addPostACType
	| ReturnType<typeof setUserProfile>
	| setStatusACType
	| deletePostACType

const ADD_POST = "ADD-POST"
const DELETE_POST = "DELETE-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"

export type initialStateProps = {
	PostData: Array<PostDataProps>
	profile: ProfileUserPropsType | null
	status: string
}

let initialState: initialStateProps = {
	PostData: [
		{ id: "1", message: "hello", likeCount: 0 },
		{ id: "2", message: "yes", likeCount: 5 },
		{ id: "3", message: "hi", likeCount: 9 },
	],
	profile: null,
	status: "",
}

export const profileReducer = (
	state: initialStateProps = initialState,
	action: ProfileReducerActionType
): initialStateProps => {
	switch (action.type) {
		case ADD_POST:
			let newPost: PostDataProps = {
				id: "1",
				message: action.newPostText,
				likeCount: 0,
			}
			return {
				...state,
				PostData: [...state.PostData, newPost],
			}
		case DELETE_POST:
			return {
				...state,
				PostData: state.PostData.filter(post => post.id !== action.postId),
			}
		case SET_STATUS: {
			return { ...state, status: action.status }
		}
		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile }
		}

		default:
			return state
	}
}

export const addPostAC = (newPostText: string) =>
	({ type: ADD_POST, newPostText } as const)
export const deletePostAC = (postId: string) =>
	({ type: DELETE_POST, postId } as const)

export const setUserProfile = (profile: ProfileUserPropsType) => {
	return { type: SET_USER_PROFILE, profile } as const
}
export const setStatusAC = (status: string) => {
	return { type: SET_STATUS, status } as const
}
export const getUserProfileTC =
	(userId: number | null): ThunkType =>
	(dispatch) => {
		ProfileApi.getProfile(userId).then((data) => {
			dispatch(setUserProfile(data))
		})
	}
export const getStatusTC =
	(userId: number | null): ThunkType =>
	(dispatch) => {
		ProfileApi.getStatus(userId).then((data) => {
			dispatch(setStatusAC(data))
		})
	}
export const updateStatusTC =
	(status: string): ThunkType =>
	(dispatch) => {
		ProfileApi.updateStatus(status).then((data) => {
			if (data.resultCode === 0) {
				dispatch(setStatusAC(status))
			}
		})
	}
