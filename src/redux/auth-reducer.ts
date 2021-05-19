export type ActionType = ReturnType<typeof setAuthUserData>;


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
  action: ActionType
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
