import axios from 'axios'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY':'02a4a31d-bd35-4e48-95ed-24afb3d73fc7'}
})

const newsInstance = axios.create({
    baseURL: 'https://inshortsapi.vercel.app/news?category='
})

export const profileAPI = {
    getUserProfile(userId){
        return instance.get(`/profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getUserStatus(userId){
        return instance.get(`/profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateUserStatus(status){
        return instance.put('profile/status', {status})
            .then(response => {
                return response.data
            })
    },
    updateUserPhoto(photo){
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData,{headers: {
            'Content-Type': 'multipart/form-data'
            }})
            .then(response => {
                return response.data
            })
    },
    updateProfileData(profile){
        return instance.put('/profile', profile)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    authMe(){
        return instance.get('auth/me')
            .then(response => {
                return response.data
            })
    },

    login(email, password, rememberMe){
        return instance.post('auth/login', {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    logout(){
        return instance.delete('auth/login')
            .then(response => {
                return response.data
            })
    }
}

export const usersAPI = {
    getUsers(currentPage, pageSize){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
}

export const followAPI = {
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}

export const newsAPI = {
    getCategoryData(category){
        return axios.get(`https://inshortsapi.vercel.app/news?category=${category}`)
            .then(response => {
                return response.data
            })
    }
}

