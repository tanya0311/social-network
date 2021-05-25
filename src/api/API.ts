import axios from "axios";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
  },
});

export const getUsersApi = {
  getUsers(currentPage: number = 1, pageSize: number = 1) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id: number) {
    return instance.post(`follow/${id}`, {}).then((response) => response.data);
  },
  unFollow(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
};

export const getHeaderApi = {
  getHeader() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
};
export const getProfileApi = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
};

//! до рефакторинга кода
// export type getUsersType={
//    currentPage: number
//    pageSize: number
// }

// const baseUrl=`https://social-network.samuraijs.com/api/1.0/`

// export const getUsers = (props:getUsersType) => { // не правильно т к props:getUsersType считается как один параметр и это просто типизация, а не входной параметр который передаем
// export const getUsers = (currentPage: number = 1, pageSize: number = 1) => {
//  до рефакторинга кода, до instance
//  return axios
//     .get(
//       `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,//  код из onPageChanged метода просто для сравнения ${pageNumber}&count=${this.props.pageSize}
//       baseUrl + `/users?page=${currentPage}&count=${pageSize}`

//       {
//         withCredentials: true,
//       }
//     )
//     .then((response) => response.data);
//   return instance
//     .get(`users?page=${currentPage}&count=${pageSize}`)
//     .then((response) => response.data);
// };
