import axios from "axios"

const instance = axios.create({
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
	withCredentials: true,
	headers: {
		"API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
	},
})

export const UsersApi = {
	getUsers(currentPage: number = 1, pageSize: number = 1) {
		return instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then((response) => response.data)
	},
	follow(id: number) {
		return instance.post(`follow/${id}`, {}).then((response) => response.data)
	},
	unFollow(id: number) {
		return instance.delete(`follow/${id}`).then((response) => response.data)
	},
}

export const authApi = {
	authMe() {
		return instance.get(`auth/me`).then((response) => response.data)
	},
	login(email: string, password: string, rememberMe: boolean) {
		return instance
			.post(`auth/login`, { email, password, rememberMe })
			.then((response) => response.data)
	},
	logout() {
		return instance.delete(`auth/login`).then((response) => response.data)
	},
}

export const ProfileApi = {
	getProfile(userId: number | null) {
		return instance.get(`profile/${userId}`).then((response) => response.data)
	},
	getStatus(userId: number | null) {
		return instance
			.get(`profile/status/${userId}`)
			.then((response) => response.data)
	},
	updateStatus(status: string) {
		return instance
			.put(`profile/status`, { status: status })
			.then((response) => response.data)
	},
	savePhotos(photoFile: File) {
		const formData = new FormData()
		formData.append("image", photoFile)
		return instance
			.put(`profile/photo`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => response.data)
	},
}

export type LoginType = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}

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
