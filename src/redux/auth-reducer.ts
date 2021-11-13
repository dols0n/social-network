import {authAPI, ResultCode} from "../api/api";
import {getUserProfile} from "./profile-reducer";
import {initialStateAuthReducerType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const SET_LOGIN_SUCCESS = 'auth/SET_LOGIN_SUCCESS'
const SET_OWNER_USER_DATA = 'auth/SET_OWNER_USER_DATA'


let initialState: initialStateAuthReducerType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    ownerUserPhoto: null,
    fullName: null,
}


const authReducer = (state = initialState, action: actionTypes): initialStateAuthReducerType => {
    switch(action.type){
        case SET_AUTH_USER_DATA:
            return{
                ...state,
                id: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth,
            }
        case SET_LOGIN_SUCCESS:
            return{
                ...state, isAuth: true, id: action.userId
            }
        case SET_OWNER_USER_DATA:
            return{
                ...state,
                ownerUserPhoto: action.ownerUserPhoto,
                fullName: action.fullName
            }
        default:
            return state
    }
}

type setAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA,
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):setAuthUserDataType  => ({
    type: SET_AUTH_USER_DATA, id, email, login, isAuth
})
type setLoginSuccessType = {type: typeof SET_LOGIN_SUCCESS, userId: number}
export const setLoginSuccess = (userId: number): setLoginSuccessType => ({
    type: SET_LOGIN_SUCCESS, userId
})
type setOwnerUserDataType = {type: typeof SET_OWNER_USER_DATA, ownerUserPhoto: string, fullName: string}
const setOwnerUserData = (ownerUserPhoto: string, fullName: string):setOwnerUserDataType  => ({
    type: SET_OWNER_USER_DATA, ownerUserPhoto, fullName
})

type actionTypes = setAuthUserDataType | setLoginSuccessType | setOwnerUserDataType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, actionTypes>

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let responseAuthMe = await authAPI.authMe()
        if (responseAuthMe.resultCode === ResultCode.success) {
            dispatch(setAuthUserData(responseAuthMe.data.id, responseAuthMe.data.email, responseAuthMe.data.login, true))
            let profile = dispatch(getUserProfile(responseAuthMe.data.id))
            profile.then((responseUserData: any) => {
                dispatch(setOwnerUserData(responseUserData.photos.small, responseUserData.fullName))
            })
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe)
        if(response.resultCode === 0) {
            dispatch(setLoginSuccess(response.data.userId))
            let profile = dispatch(getUserProfile(response.data.userId))
            profile.then((responseUserData: any) => {
                dispatch(setOwnerUserData(responseUserData.photos.small, responseUserData.fullName))
            })
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if (response.resultCode === ResultCode.success) {
            dispatch(setAuthUserData(null, null, null, false))

        }

    }
}





export default authReducer

