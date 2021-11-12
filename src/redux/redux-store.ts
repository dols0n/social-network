import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk'
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import usersReducer from "./users-reducer";
import {reducer as formReducer} from 'redux-form'
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";

const DELETE_FORM_DATA = 'form/DELETE_FORM_DATA'

export const deleteFormData = () => ({
    type: DELETE_FORM_DATA
})

let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    auth: authReducer,
    app: appReducer,
    usersPage: usersReducer,
    newsPage: newsReducer,
    form: formReducer.plugin({
        userPost: (state, action) => { // name of form given to reduxForm()
            switch(action.type) {
                case DELETE_FORM_DATA:
                    return undefined;
                default:
                    return state;
            }
        },
        messageForm: (state, action) => { // name of form given to reduxForm()
            switch(action.type) {
                case DELETE_FORM_DATA:
                    return undefined;
                default:
                    return state;
            }
        }

    })
})

type RootReducerType = typeof RootReducer
export type GlobalStateType = ReturnType<RootReducerType>


let store = createStore(RootReducer, applyMiddleware(thunkMiddleWare))

export default store


// @ts-ignore
window.getState = store.getState()


