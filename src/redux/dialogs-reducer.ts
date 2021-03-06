import {profileAPI} from "../api/api";
import userPhoto from './../assets/image/user.png'
import {initialStateDialogsReducerType} from './../Types/types'
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";


const CREATE_NEW_DIALOG = 'dialogsPage/CREATE_NEW_DIALOG'
const SEND_MESSAGE = '/dialogsPage/SEND_MESSAGE'


const initialState: initialStateDialogsReducerType = {
    usersDialogs: {
        19829: {
            messages: [{messageId: 1, message: "Hi! it is my first message", myMessage: false}],
            userSmallPhoto: userPhoto,
            fullName: "Warsher"
        },
    },
}

const dialogsReducer = (state = initialState, action: actionTypes): initialStateDialogsReducerType => {
    switch(action.type){
        case CREATE_NEW_DIALOG:
            if(Object.values(state.usersDialogs).find(elem => elem == action.userId ? false : true)){
                let copyState = {...state}
                copyState.usersDialogs = {...state.usersDialogs}
                copyState.usersDialogs[action.userId] = {messages: [],
                    userSmallPhoto: action.userSmallPhoto ? action.userSmallPhoto : userPhoto,
                    fullName: action.fullName
                }

                return copyState
            }
            return state
        case SEND_MESSAGE:
            let createMessageId = state.usersDialogs[action.userId].messages.length + 1
            let copyState = {...state}
            copyState.usersDialogs = {...state.usersDialogs}
            copyState.usersDialogs[action.userId] = {...state.usersDialogs[action.userId]}
            copyState.usersDialogs[action.userId].messages = [...state.usersDialogs[action.userId].messages]
            copyState.usersDialogs[action.userId].messages.push({messageId: createMessageId, message: action.message, myMessage: true})
            return copyState
        default:
            return state
    }
}

type createNewDialogType = {type: typeof CREATE_NEW_DIALOG, userId: number, userSmallPhoto: string | null, fullName: string}
export const createNewDialog = (userId: number, userSmallPhoto: string | null, fullName: string): createNewDialogType => ({
    type: CREATE_NEW_DIALOG, userId, userSmallPhoto, fullName
})
type sendMessageType = {type: typeof SEND_MESSAGE, message: string, userId: number}
export const sendMessage = (message: string, userId: number): sendMessageType => ({
    type: SEND_MESSAGE, message, userId
})

type actionTypes = createNewDialogType | sendMessageType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, actionTypes>



export const createNewDialogWithRequestPhoto = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getUserProfile(userId)
        dispatch(createNewDialog(userId, response.photos.small, response.fullName))
    }
}



export default dialogsReducer


