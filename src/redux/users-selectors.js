import {createSelector} from "reselect";

const getUsers = (state) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(user => true)
})

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsToggle = (state) => {
    return state.usersPage.isToggle
}


//comment
