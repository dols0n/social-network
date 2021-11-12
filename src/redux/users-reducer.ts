import {followAPI, usersAPI} from "../api/api";
import {initialStateUsersReducerType, userObject} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";


const SET_USERS_PAGE = 'usersPage/SET_USERS_PAGE'
const UPDATE_CURRENT_PAGE = 'usersPage/UPDATE_CURRENT_PAGE'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersPage/TOGGLE_IS_FOLLOWING_PROGRESS'
const FOLLOWED_USER = 'usersPage/FOLLOWED_USER'
const CHANGE_CURRENT_PAGE = 'usersPage/CHANGE_CURRENT_PAGE'



let initialState: initialStateUsersReducerType  = {
    users: [],
    totalUsersCount: null,
    pageSize: 5,
    currentPage: 1,
    isToggle: [false, null]
}


const usersReducer = (state = initialState, action: actionTypes): initialStateUsersReducerType => {
    switch(action.type){
        case SET_USERS_PAGE:
            return{
                ...state, users: action.users, totalUsersCount: action.totalUsersCount
            }
        case UPDATE_CURRENT_PAGE:
            return{
                ...state, currentPage: action.currentPage
            }
        case FOLLOWED_USER:
            return{
                ...state, users: state.users.map(user => {
                    if(user.id === action.id){
                        return {...user, followed: action.followed}
                    }
                    return user
                })
            }
        case CHANGE_CURRENT_PAGE:
            return{
                ...state, currentPage: action.currentPage
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return{
                ...state, isToggle: [action.isToggle, action.id]
            }

        default:
            return state
    }
}

type setUsersPageType = {type: typeof SET_USERS_PAGE, users: Array<userObject>, totalUsersCount: number}
export const setUsersPage = (users: Array<userObject>, totalUsersCount: number): setUsersPageType => ({
    type: SET_USERS_PAGE, users, totalUsersCount
})
type updateCurrentPageType = {type: typeof UPDATE_CURRENT_PAGE, currentPage: number}
export const updateCurrentPage = (currentPage: number): updateCurrentPageType => ({
    type: UPDATE_CURRENT_PAGE, currentPage
})
type followedUserType = {type: typeof FOLLOWED_USER, id: number, followed: boolean}
export const followedUser = (id: number, followed: boolean): followedUserType => ({
    type: FOLLOWED_USER, id, followed
})
type toggleIsFollowingProgressType = {type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, id: number, isToggle: boolean}
export const toggleIsFollowingProgress = (id: number, isToggle: boolean): toggleIsFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, id, isToggle
})
type changeCurrentPageType = {type: typeof CHANGE_CURRENT_PAGE, currentPage: number}
export const changeCurrentPage = (currentPage: number): changeCurrentPageType => ({
    type: CHANGE_CURRENT_PAGE, currentPage
})

type actionTypes = setUsersPageType | updateCurrentPageType | followedUserType | toggleIsFollowingProgressType | changeCurrentPageType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, actionTypes>

export const getUsersPage = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsersPage(response.items, response.totalCount))
        dispatch(updateCurrentPage(currentPage))
    }
}

export const followUser = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFollowingProgress(id, true))
        let response = await followAPI.follow(id)
        dispatch(followedUser(id, true))
        dispatch(toggleIsFollowingProgress(id, false))
    }
}
export const unfollowUser = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFollowingProgress(id, true))
        let response = await followAPI.unfollow(id)
        dispatch(followedUser(id, false))
        dispatch(toggleIsFollowingProgress(id, false))
    }
}


export default usersReducer

