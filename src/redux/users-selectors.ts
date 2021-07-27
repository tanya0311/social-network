import { RootReducersType } from "./redux-store"

export const GetUsers=(state:RootReducersType)=>{
   return state.userPage.users
}
export const GetPageSize=(state:RootReducersType)=>{
   return state.userPage.pageSize
}
export const GetTotalUsersCount=(state:RootReducersType)=>{
   return  state.userPage.totalUsersCount
}
export const GetCurrentPage=(state:RootReducersType)=>{
   return   state.userPage.currentPage
}
export const GetIsFetching =(state:RootReducersType)=>{
   return   state.userPage.isFetching
}
export const GetFollowingInProgress =(state:RootReducersType)=>{
   return    state.userPage.followingInProgress
}

