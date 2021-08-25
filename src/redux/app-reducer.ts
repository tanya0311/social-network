import { getAuthUserDataTC } from "./auth-reducer";
import { ThunkType } from "./redux-store";


let initialState: initialStatePropsType = {
  initialazed: false,
};

const SET_INITIALAZED = "SET_INITIALAZED";

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

//action
export const setInitialazedAC = () => ({ type: SET_INITIALAZED } as const);

//thunk
export const initialazeAppTC = (): ThunkType => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserDataTC());
    Promise.all([promise]).then(() => {
      dispatch(setInitialazedAC());
    })
  };
};

//type 
export type initialStatePropsType = {
  initialazed: boolean;
};

export type AppReducerActionType = ReturnType<typeof setInitialazedAC>;