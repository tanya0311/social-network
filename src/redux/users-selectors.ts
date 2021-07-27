import { createSelector, Selector } from "reselect";
import { RootReducersType } from "./redux-store";
import { UsersPropsType } from "./users-reducer";

export const GetUsersPrimitive: Selector<
  RootReducersType,
  Array<UsersPropsType>
> = (state) => {
  return state.userPage.users;
};
// export const GetUsersSelector=(state:RootReducersType)=>{
//    return GetUsersPrimitive(state).filter(u=> true)
// }

export const GetUsers = createSelector(
  GetUsersPrimitive,
  (users: Array<UsersPropsType>) => {
    return users.filter((u) => true);
  }
);

export const GetPageSize: Selector<RootReducersType, number> = (state) => {
  return state.userPage.pageSize;
};
export const GetTotalUsersCount: Selector<RootReducersType, number> = (
  state
) => {
  return state.userPage.totalUsersCount;
};
export const GetCurrentPage: Selector<RootReducersType, number> = (state) => {
  return state.userPage.currentPage;
};
export const GetIsFetching: Selector<RootReducersType, boolean> = (state) => {
  return state.userPage.isFetching;
};
export const GetFollowingInProgress: Selector<
  RootReducersType,
  Array<number>
> = (state) => {
  return state.userPage.followingInProgress;
};
