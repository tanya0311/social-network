export type PostDataProps = {
  id: string;
  message: string;
  likeCount: number;
};
export type ContactsType={
  facebook: string;
  website: null;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: null;
  github: string;
  mainLink: null;
}
export type ProfileUserPropsType = {
  aboutMe: string;
  contacts: ContactsType
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};
export type addPostActionCreatorType = ReturnType<typeof addPostAC>;
export type updateNewPostActionCreatorType = ReturnType<typeof onPostChangeAC>;

export type ProfileReducerActionType =
  | addPostActionCreatorType
  | updateNewPostActionCreatorType
  | ReturnType<typeof setUserProfile>;

const ADD_POST = "ADD-POST";
const APDATE_NEW_POST = "APDATE-NEW-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";

export type initialStateProps = {
  PostData: Array<PostDataProps>;
  newPostText: string;
  profile: ProfileUserPropsType | null;
};
// или другая запись типизации
//  export type initialStateProps = typeof initialState;

let initialState: initialStateProps = {
  PostData: [
    { id: "1", message: "hello", likeCount: 0 },
    { id: "2", message: "yes", likeCount: 5 },
    { id: "3", message: "hi", likeCount: 9 },
    { id: "3", message: "hi", likeCount: 9 },
  ],
  newPostText: "",
  profile: null,
};

export const profileReduser = (
  state: initialStateProps = initialState,
  action: ProfileReducerActionType
): initialStateProps => {
  // debugger
  switch (action.type) {
    case ADD_POST:
      let newPost: PostDataProps = {
        id: "1",
        message: state.newPostText,
        likeCount: 0,
      };

      return {
        ...state,
        PostData: [...state.PostData, newPost],
        newPostText: "",
      };

    case APDATE_NEW_POST: {
      return { ...state, newPostText: action.newText };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }

    default:
      return state;
  }
};

export const addPostAC = () => ({ type: ADD_POST } as const);
export const onPostChangeAC = (newText: string) => {
  return { type: APDATE_NEW_POST, newText } as const;
};
export const setUserProfile = (profile: ProfileUserPropsType) => {
  return { type: SET_USER_PROFILE, profile } as const;
};
