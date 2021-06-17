import { ProfileApi } from "../api/API";
import { ThunkType } from "./redux-store";

export type PostDataProps = {
  id: string;
  message: string;
  likeCount: number;
};
export type ContactsType = {
  facebook: string;
  website: null;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: null;
  github: string;
  mainLink: null;
};
export type ProfileUserPropsType = {
  aboutMe: string;
  contacts: ContactsType;
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
export type setStatusActionCreatorType = ReturnType<typeof setStatusAC>;

export type ProfileReducerActionType =
  | addPostActionCreatorType
  | updateNewPostActionCreatorType
  | ReturnType<typeof setUserProfile>
  | setStatusActionCreatorType;

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = "UPDATE-NEW-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

export type initialStateProps = {
  PostData: Array<PostDataProps>;
  newPostText: string;
  profile: ProfileUserPropsType | null;
  status: string;
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
  status: "",
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

    case UPDATE_NEW_POST: {
      return { ...state, newPostText: action.newText };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
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
  return { type: UPDATE_NEW_POST, newText } as const;
};
export const setUserProfile = (profile: ProfileUserPropsType) => {
  return { type: SET_USER_PROFILE, profile } as const;
};
export const setStatusAC = (status: string) => {
  return { type: SET_STATUS, status } as const;
};
export const getUserProfileTC =
  (userId: number): ThunkType =>
  (dispatch) => {
    ProfileApi.getProfile(userId).then((data) => {
      // this.props.toggleIsFetching(false);
      dispatch(setUserProfile(data));
      // this.props.setUsersTotalCount(response.data.totalCount);
    });
  };
export const getStatusTC =
  (userId: number): ThunkType =>
  (dispatch) => {
    ProfileApi.getStatus(userId).then((data) => {
      // this.props.toggleIsFetching(false);
      dispatch(setStatusAC(data));
      // this.props.setUsersTotalCount(response.data.totalCount);
    });
  };
export const updateStatusTC =
  (status:string): ThunkType =>
  (dispatch) => {
    ProfileApi.updateStatus(status).then((data) => {

      // this.props.toggleIsFetching(false);
      if(data.resultCode === 0){
        dispatch(setStatusAC(status))
      }
      
      // this.props.setUsersTotalCount(response.data.totalCount);
    });
  };
