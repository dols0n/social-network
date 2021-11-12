import {getAuthUserData} from "./auth-reducer";
import {initialStateAppReducerType} from "../Types/types";

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

export const initializedApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData())
            Promise.all([promise])
                .then(response => {
                    dispatch(initializedSuccess())
                })
    }
}

export default appReducer
