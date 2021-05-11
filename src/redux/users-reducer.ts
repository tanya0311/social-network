type PhotosType = {
  small: string | null;
  large: string | null;
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
  isFetching: boolean;
};

let initialState: initialStatePropsType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
};

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

export type UsersReducerActionType =
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setUsersTotalCount>
  | ReturnType<typeof toggleIsFetching>
  ;

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
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    default:
      return state;
  }
};

export const follow = (userID: number) => ({ type: FOLLOW, userID } as const);

export const unfollow = (userID: number) => {
  return { type: UNFOLLOW, userID } as const;
};

export const setUsers = (users: Array<UsersPropsType>) => {
  return { type: SET_USERS, users } as const;
};

export const setCurrentPage = (currentPage: number) => {
  return { type: SET_CURRENT_PAGE, currentPage } as const;
};
export const setUsersTotalCount = (count: number) => {
  return { type: SET_TOTAL_USERS_COUNT, count } as const;
};
export const toggleIsFetching = (isFetching: boolean) => {
  return { type: TOGGLE_IS_FETCHING, isFetching } as const;
};
