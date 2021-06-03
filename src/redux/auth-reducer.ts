import { getHeaderAuthApi } from "../api/API";
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
      return { ...state, ...action.data, isAuth: true };
    default:
      return state;
  }
}
export const setAuthUserData = (id: number, email: string, login: string) => {
  // debugger
  return { type: SET_USER_DATA, data: { id, login, email } } as const;
};

export const getAuthUserDataTC = (): ThunkType => (dispatch) => {
  getHeaderAuthApi.authMe().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login));
    }
  });
};
