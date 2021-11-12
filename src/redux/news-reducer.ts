import {newsAPI} from "../api/api";
import {initialStateNewsReducerType, categoryData} from './../Types/types'
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";

const SET_CATEGORY_DATA = 'newsPage/SET_CATEGORY_DATA'



const initialState: initialStateNewsReducerType = {
    categories: {
        all: [],
        business: [],
        sports: [],
        politics: [],
        technology: [],
        science: []
    }
}

const newsReducer = (state = initialState, action: any):initialStateNewsReducerType => {
    switch(action.type){
        case SET_CATEGORY_DATA:
            return{...state, categories: {...state.categories, [action.category]: action.categoryData}}
        default:
            return state
    }
}

type setCategoryDataType = {type: typeof SET_CATEGORY_DATA, category: string, categoryData: categoryData}
const setCategoryData = (category: string, categoryData: categoryData): setCategoryDataType => ({
    type: SET_CATEGORY_DATA, category, categoryData
})

type actionTypes = setCategoryDataType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, actionTypes>


export const getCategoryData = (category: string): ThunkType => {
    return async (dispatch: any) => {
        let response = await newsAPI.getCategoryData(category)
        if(response.success === true){
            dispatch(setCategoryData(category, response.data))
        }
    }
}



export default newsReducer