import { Dispatch } from "redux"
import { stopSubmit } from "redux-form"
import { authApi } from "../api/API"
import { ThunkType } from "./redux-store"

const SET_USER_DATA = "auth/SET_USER_DATA"

export function authReducer(
	state: initialStatePropsType = initialState,
	action: AuthActionType
): initialStatePropsType {
	switch (action.type) {
		case SET_USER_DATA:
			return { ...state, ...action.data }
		default:
			return state
	}
}

//action
export const setAuthUserData = (
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
) => {
	return { type: SET_USER_DATA, data: { id, login, email, isAuth } } as const
}

//thunk
export const getAuthUserDataTC =
	(): ThunkType => async (dispatch: Dispatch<AuthActionType>) => {
		let data = await authApi.authMe()

		if (data.resultCode === 0) {
			let { id, email, login } = data.data
			dispatch(setAuthUserData(id, email, login, true))
		}
	}
export const loginTC =
	(email: string, password: string, rememberMe: boolean): ThunkType =>
	async (dispatch) => {
		let data = await authApi.login(email, password, rememberMe)
		if (data.resultCode === 0) {
			dispatch(getAuthUserDataTC())
		} else {
			let messages = data.messages.length > 0 ? data.messages[0] : "some error"
			dispatch(stopSubmit("login", { _error: messages }))
		}
	}
export const logoutTC =
	(): ThunkType => async (dispatch: Dispatch<AuthActionType>) => {
		let data = await authApi.logout()

		if (data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false))
		}
	}

//type
export type initialStatePropsType = {
	id: null | number
	email: null | string
	login: null | string
	isAuth: boolean
}

let initialState: initialStatePropsType = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
}

export type AuthActionType = ReturnType<typeof setAuthUserData>
