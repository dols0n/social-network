import {getAuthUserData} from "./auth-reducer";
import {initialStateAppReducerType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'


let initialState:initialStateAppReducerType  = {
    initialized: false
}

const appReducer = (state = initialState, action: any): initialStateAppReducerType => {
    switch(action.type){
        case INITIALIZED_SUCCESS:
            return{
                ...state, initialized: action.initialized
            }
        default:
            return state
    }
}


type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS,
    initialized: boolean
}
export const initializedSuccess = ():initializedSuccessType => ({
    type: INITIALIZED_SUCCESS, initialized: true
})

type actionTypes = initializedSuccessType
type ThunkType = ThunkAction<void, GlobalStateType, unknown, actionTypes>

export const initializedApp = (): ThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData())
            Promise.all([promise])
                .then(response => {
                    dispatch(initializedSuccess())
                })
    }
}

export default appReducer
