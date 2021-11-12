import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "../redux/redux-store";

export type postsObject = {
    id: number
    postMessage: string
    likes: number
    isLikes: boolean
    postPhoto: string
}
type contactsObject = {
    [index: string]: string | null
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type photosObject = {
    small: string | null
    large: string | null
}
export type profileObject = {
    photos: photosObject;
    aboutMe: string | null
    contacts: contactsObject
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    userId: number
}
export type initialStateProfileReducerType = {
    posts: Array<postsObject>
    profile: profileObject | null
    profileStatus: string | null
    editModeProfileData: boolean
    editModeProfileContacts: boolean
} // profile-reducer


export type userObject = {
    name: string
    id: number
    photos: photosObject
    status: string | null
    followed: boolean
}
export type initialStateUsersReducerType = {
    users: Array<userObject>
    totalUsersCount: null | number
    pageSize: number
    currentPage: number
    isToggle: [index: boolean, index: null | number] // first element - subscription process in progress?, second element - id
} // users-reducer


export type categoryData = {
    author: string
    content: string
    imageUrl: string
}
type categoriesList = {
    all: Array<categoryData>,
    business: Array<categoryData>,
    sports: Array<categoryData>,
    politics: Array<categoryData>,
    technology: Array<categoryData>,
    science: Array<categoryData>

}
export type initialStateNewsReducerType = {
    categories: categoriesList
} // news-reducer


type messagesElement = {
    messageId: number, message: string, myMessage: boolean  // inside messages array
}
type itemObject = {                     // inside user message object
    messages: Array<messagesElement>
    userSmallPhoto: string
    fullName: string
}
interface usersDialogsElem {   // inside usersDialogs
    [index: number]: itemObject
}
export type initialStateDialogsReducerType = {    // inside state
    usersDialogs: usersDialogsElem
} // dialogs-reducer


export type initialStateAuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    ownerUserPhoto: string | null
    fullName: string | null
} // auth-reducer

export type initialStateAppReducerType = { // app-reducer
    initialized: boolean
}

