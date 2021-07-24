import { stopSubmit } from "redux-form";
import { getHeaderAuthApi, LoginType } from "../api/API";
import { ThunkType } from "./redux-store";

export type AuthActionType = ReturnType<typeof setAuthUserData>;

export type initialStatePropsType = {
  id: null | number;
  email: null | string;
  login: null | string;
  isAuth: boolean;
};

let initialState: initialStatePropsType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const SET_USER_DATA = "SET_USER_DATA";

export function authReduser(
  state: initialStatePropsType = initialState,
  action: AuthActionType
): initialStatePropsType {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) => {
  return { type: SET_USER_DATA, data: { id, login, email, isAuth } } as const;
};

export const getAuthUserDataTC = (): ThunkType => (dispatch) => {
  getHeaderAuthApi.authMe().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};
export const loginTC =
  (email: string, password: string, rememberMe: boolean): ThunkType =>
  (dispatch) => {
    getHeaderAuthApi.login(email, password, rememberMe).then((data) => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserDataTC());
      } else {
          let messages = data.messages.length > 0 ? data.messages[0] : 'some error';
          dispatch(stopSubmit('login', {_error: messages}))
       }
    });
  };
export const logoutTC = (): ThunkType => (dispatch) => {
  getHeaderAuthApi.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};
