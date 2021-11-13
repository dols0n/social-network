import {profileAPI, ResultCode} from "../api/api";
import postPhoto from './../assets/image/postPhoto.jpg'
import {stopSubmit} from "redux-form";
import {initialStateProfileReducerType, profileObject, photosObject} from './../Types/types'
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";




const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE'
const SET_USER_STATUS = 'profilePage/SET_USER_STATUS'
const LIKES_USER_POST = 'profilePage/LIKES_USER_POST'
const ADD_NEW_USER_POST = 'profilePage/ADD_NEW_USER_POST'
const DELETE_USER_POST = 'profilePage/DELETE_USER_POST'
const SET_USER_PHOTO = 'profilePage/SET_USER_PHOTO'
const CHANGE_EDIT_MODE_PROFILE_DATA = 'profilePage/CHANGE_EDIT_MODE_PROFILE_DATA'
const CHANGE_EDIT_MODE_PROFILE_CONTACTS = 'profilePage/CHANGE_EDIT_MODE_PROFILE_CONTACTS'


let initialState: initialStateProfileReducerType = {
    posts: [{id: 1, postMessage: 'it is my first post on this social network',likes: 4, isLikes: false, postPhoto: postPhoto},
        {id: 2, postMessage: 'it is my second post on this social network', likes: 2, isLikes: false, postPhoto: postPhoto},
        {id: 3, postMessage: 'oh, this social network is so small', likes: 7, isLikes: false, postPhoto: postPhoto},
        {id: 4, postMessage: 'i go to the theatre this evening', likes: 1, isLikes: false, postPhoto: postPhoto}
    ],
    profile: null,
    profileStatus: null,
    editModeProfileData: false,
    editModeProfileContacts: false
}


const profileReducer = (state = initialState, action: actionTypes): initialStateProfileReducerType => {
    switch(action.type){
        case SET_USER_PROFILE:
            return{
                ...state, profile: action.profile
            }

        case SET_USER_STATUS:
            return{
                ...state, profileStatus: action.status
            }
        case LIKES_USER_POST:
            return{
                ...state, posts: state.posts.map(post => {
                    if(post.id === action.id){
                        let changeLikes = action.isLikes ? post.likes + 1 : post.likes - 1
                        return {...post,
                            likes: changeLikes,
                            isLikes: action.isLikes}
                    }
                    return post
                })
            }
        case ADD_NEW_USER_POST:
            let newPost = {id: state.posts[state.posts.length - 1].id + 1,
                postMessage: action.postMessage,
                likes: 0,
                isLikes: false,
                postPhoto: postPhoto
            }
            let changePosts = [...state.posts]
            changePosts.push(newPost)
            return{...state, posts: changePosts}
        case DELETE_USER_POST:
            return{
                ...state, posts: state.posts.filter(post => {
                    if(post.id != action.id){
                        return true
                    }
                    return false
                })
            }
        case SET_USER_PHOTO:
            // @ts-ignore
            return{...state, profile: {...state.profile, photos: action.photos}}  // TROUBLE WITH PROFILE TYPE
        case CHANGE_EDIT_MODE_PROFILE_DATA:
            return{...state, editModeProfileData: action.editModeProfileData}
        case CHANGE_EDIT_MODE_PROFILE_CONTACTS:
            return{...state, editModeProfileContacts: action.editModeProfileContacts}
        default:
            return state
    }
}
type likesUserPostType = {type: typeof LIKES_USER_POST, id: number, isLikes: boolean}
export const likesUserPost = (id: number, isLikes: boolean): likesUserPostType => ({
    type: LIKES_USER_POST, id, isLikes
})
type addNewUserPostType = {type: typeof ADD_NEW_USER_POST, postMessage: string}
export const addNewUserPost = (postMessage: string): addNewUserPostType => ({
    type: ADD_NEW_USER_POST, postMessage
})
type deleteUserPostType = {type: typeof DELETE_USER_POST, id: number}
export const deleteUserPost = (id: number): deleteUserPostType => ({
    type: DELETE_USER_POST, id
})
type setUserProfileType = {type: typeof SET_USER_PROFILE, profile: profileObject}
const setUserProfile = (profile: profileObject): setUserProfileType => ({
    type: SET_USER_PROFILE, profile
})
type setUserStatusType = {type: typeof SET_USER_STATUS, status: string}
const setUserStatus = (status: string): setUserStatusType => ({
    type: SET_USER_STATUS, status
})
type setUserPhotoType = {type: typeof SET_USER_PHOTO, photos: photosObject}
const setUserPhoto = (photos: photosObject): setUserPhotoType => ({
    type: SET_USER_PHOTO, photos
})
type changeEditModeProfileDataType = {type: typeof CHANGE_EDIT_MODE_PROFILE_DATA, editModeProfileData: boolean}
export const changeEditModeProfileData = (editModeProfileData: boolean): changeEditModeProfileDataType => ({
    type: CHANGE_EDIT_MODE_PROFILE_DATA, editModeProfileData
})
type changeEditModeProfileContactsType = {type: typeof CHANGE_EDIT_MODE_PROFILE_CONTACTS, editModeProfileContacts: boolean}
export const changeEditModeProfileContacts = (editModeProfileContacts: boolean): changeEditModeProfileContactsType => ({
    type: CHANGE_EDIT_MODE_PROFILE_CONTACTS, editModeProfileContacts
})
type deleteFormDataType = {type: "delete"}
export const deleteFormData = (): deleteFormDataType => ({
    type: "delete"
})

type actionTypes = likesUserPostType | addNewUserPostType | deleteUserPostType | setUserProfileType
    | setUserStatusType | setUserPhotoType | changeEditModeProfileDataType | changeEditModeProfileContactsType
    | deleteFormDataType

type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, actionTypes>
type getUserProfile = ThunkAction<Promise<profileObject>, GlobalStateType, unknown, actionTypes>

export const getUserProfile = (userId: number): getUserProfile => {
    return async (dispatch) => {
        let response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfile(response))
        return response
    }
}

export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getUserStatus(userId)
        dispatch(setUserStatus(response))
    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateUserStatus(status)
        if (response.resultCode === ResultCode.success) {
            dispatch(setUserStatus(status))
        }
    }
}

export const updateUserPhoto = (photo: any): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateUserPhoto(photo)
        if(response.resultCode === ResultCode.success){
            dispatch(setUserPhoto(response.data.photos))
        }
    }
}

export const updateProfileData = (profile: profileObject): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateProfileData(profile)
        if(response.resultCode === ResultCode.success) {
            dispatch(setUserProfile(profile))
            dispatch(changeEditModeProfileData(false))
        }
    }
}

export const updateProfileContacts = (profile: profileObject): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateProfileData(profile)
        if(response.resultCode === ResultCode.success) {
            dispatch(setUserProfile(profile))
            dispatch(changeEditModeProfileContacts(false))
        }else{
            let message = response.messages[0]
            let action = stopSubmit('profileContactsForm', {_error: message})
            dispatch(action)
        }
    }
}





export default profileReducer
