import axios from 'axios'
import {categoryData, profileObject, userObject} from "../Types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY':'02a4a31d-bd35-4e48-95ed-24afb3d73fc7'}
})

export enum ResultCode {
    success = 0,
    error = 1
}

type updateUserPhoto = {
    data: {
        photos: {
            small: string,
            large: string
        }
    },
    resultCode: ResultCode,
    messages: Array<string>
}
type updateProfile = {
    resultCode: ResultCode,
    messages: Array<string>,
    data: {}
}

export const profileAPI = {
    getUserProfile(userId: number){
        return instance.get<profileObject>(`/profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getUserStatus(userId: number){
        return instance.get<string>(`/profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateUserStatus(status: string){
        return instance.put<updateProfile>('profile/status', {status})
            .then(response => {
                return response.data
            })
    },
    updateUserPhoto(photo: any){
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put<updateUserPhoto>('profile/photo', formData,{headers: {
            'Content-Type': 'multipart/form-data'
            }})
            .then(response => {
                return response.data
            })
    },
    updateProfileData(profile: profileObject){
        return instance.put<updateProfile>('/profile', profile)
            .then(response => {
                return response.data
            })
    }
}

type authMe = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCode,
    messages: Array<string>
}
type login = {
    resultCode: ResultCode,
    messages: Array<string>,
    data: {
        userId: number
    }
}
type logout = {
    resultCode: ResultCode,
    messages: Array<string>,
    data: {}
}

export const authAPI = {
    authMe(){
        return instance.get<authMe>('auth/me')
            .then(response => {
                return response.data
            })
    },

    login(email: string, password: string, rememberMe: boolean){
        return instance.post<login>('auth/login', {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    logout(){
        return instance.delete<logout>('auth/login')
            .then(response => {
                return response.data
            })
    }
}

type getUsers = {
    items: Array<userObject>,
    totalCount: number,
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number){
        return instance.get<getUsers>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
}

type followAPI = {
    resultCode: ResultCode,
    messages: Array<string>,
    data: {}
}

export const followAPI = {
    follow(userId: number){
        return instance.post<followAPI>(`follow/${userId}`)
    },
    unfollow(userId: number){
        return instance.delete<followAPI>(`follow/${userId}`)
    }
}

type getCategoryData = {
    category: string,
    data: categoryData,
    success: boolean
}

export const newsAPI = {
    getCategoryData(category: string){
        return axios.get<getCategoryData>(`https://inshortsapi.vercel.app/news?category=${category}`)
            .then(response => {
                return response.data
            })
    }
}

