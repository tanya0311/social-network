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
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
};

let initialState: initialStatePropsType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
};

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";

export type UsersReducerActionType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setUsersTotalCountAC>;

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
      // return { ...state, users: [...state.users, ...action.users] };
      return { ...state, users: action.users };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };

    default:
      return state;
  }
};

export const followAC = (userID: number) => ({ type: FOLLOW, userID } as const);

export const unfollowAC = (userID: number) => {
  return { type: UNFOLLOW, userID } as const;
};

export const setUsersAC = (users: Array<UsersPropsType>) => {
  return { type: SET_USERS, users } as const;
};

export const setCurrentPageAC = (currentPage: number) => {
  return { type: SET_CURRENT_PAGE, currentPage } as const;
};
export const setUsersTotalCountAC = (count: number) => {
  return { type: SET_TOTAL_USERS_COUNT, count } as const;
};
