export type UsersPropsType = {
  id: string
  followed: boolean
  name: string
  photoURL:string
  status: string
  location: { country: string; city: string };
};

export type initialStatePropsType = {
  users: Array<UsersPropsType>;
};

let initialState: initialStatePropsType= {
  users: [
    {
      id: "1u",
      followed: true,
      name: "Ana",
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWU2R4OlgX8OXZon0OT4lRsQttb9XaZX3Ug&usqp=CAU',
      status: "hello world",
      location: { country: "Belarus", city: "Minsk" },
    },
    {
      id: "2u",
      followed: false,
      name: "Gleb",
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTygNZj-_qkSsq3iucBBvqQPKQDJ-72E6o9T_dSiwMrzWHcu4KadOlxSLXGVVfZ8mYO1ec&usqp=CAU',
      status: "hello world",
      location: { country: "Poland", city: "Krakov" },
    },
    {
      id: "3u",
      followed: true,
      name: "Nikita",
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqN2ZnsPBr6i9jG4EAKDoFQR8x4Qfuodf5xup4iTygjI8-dgQ2f2DH3sa3cGAOn2FQvg&usqp=CAU',
      status: "hello world",
      location: { country: "Belarus", city: "Minsk" },
    },
  ],
};

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

export type UsersReducerActionType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>;

export const followAC = (userID: string) => ({ type: FOLLOW, userID } as const);

export const unfollowAC = (userID: string) => {
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
        ...state, users: state.users.map((u) =>
          u.id === action.userID ? { ...u, followed: true } : u
        ),
      };

    case UNFOLLOW:
      return {
        ...state, users: state.users.map((u) =>
          u.id === action.userID ? { ...u, followed: false } : u
        ),
      };

    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] };

    default:
      return state;
  }
};
