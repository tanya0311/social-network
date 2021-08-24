import { getAuthUserDataTC } from "./auth-reducer";
import { ThunkType } from "./redux-store";

export type initialStatePropsType = {
  initialazed: boolean;
};

let initialState: initialStatePropsType = {
  initialazed: false,
};

const SET_INITIALAZED = "SET_INITIALAZED";

export type AppReducerActionType = ReturnType<typeof setInitialazedAC>;

export const appReducer = (
  state: initialStatePropsType = initialState,
  action: AppReducerActionType
): initialStatePropsType => {
  switch (action.type) {
    case SET_INITIALAZED:
      return {
        ...state,
        initialazed: true,
      };
    default:
      return state;
  }
};

export const setInitialazedAC = () => ({ type: SET_INITIALAZED } as const);

export const initialazeAppTC = (): ThunkType => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserDataTC());
    Promise.all([promise]).then(() => {
      dispatch(setInitialazedAC());
    })
  };
};
