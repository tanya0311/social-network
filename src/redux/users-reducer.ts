type PhotosType = {
  small: string;
  large: string;
};

export type UsersPropsType = {
  id: number;
  followed: boolean;
  name: string;
  photos: PhotosType;
  status: string;
  location?: { country: string; city: string };
};

export type initialStatePropsType = {
  users: Array<UsersPropsType>;
};

let initialState: initialStatePropsType = {
  users: [],
};

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

export type UsersReducerActionType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>;

export const followAC = (userID: number) => ({ type: FOLLOW, userID } as const);

export const unfollowAC = (userID: number) => {
  return { type: UNFOLLOW, userID } as const;
};

export const setUsersAC = (users: Array<UsersPropsType>) => {
  return { type: SET_USERS, users } as const;
};

export const userReduser = (
  state: initialStatePropsType = initialState,
  action: UsersReducerActionType
): initialStatePropsType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userID ? { ...u, followed: true } : u
        ),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userID ? { ...u, followed: false } : u
        ),
      };

    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] };

    default:
      return state;
  }
};
