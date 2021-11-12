import React from "react";
import {connect, ConnectedProps} from "react-redux";
import Users from "./Users";
import {
    getUsersPage,
    followUser,
    unfollowUser,
} from "../../redux/users-reducer";
import {
    getPageSize,
    getCurrentPage,
    getTotalUsersCount,
    getIsToggle,
    getUsersSelector
} from "../../redux/users-selectors";
import {createNewDialog} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {userObject} from "../../Types/types";
import {GlobalStateType} from "../../redux/redux-store";


type MapStateProps = {
    users: Array<userObject>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isToggle: [index: boolean, index: null | number]
}
type MapDispatchProps = {
    getUsersPage: (currentPage: number, pageSize: number) => void
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    createNewDialog: (userId: number, userSmallPhoto: string | null, fullName: string) => void
}
type OwnProps = {}
type Props = MapStateProps & MapDispatchProps & OwnProps

class UsersContainer extends React.Component<Props>{
    componentDidMount() {
        this.props.getUsersPage(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        this.props.getUsersPage(currentPage, this.props.pageSize)
    }

    render(){
        console.log("RENDER")
        return(
            <div>
                <Users users={this.props.users}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       pageSize={this.props.pageSize}
                       followUser={this.props.followUser}
                       unfollowUser={this.props.unfollowUser}
                       onPageChanged={this.onPageChanged}
                       isToggle={this.props.isToggle}
                       createNewDialog={this.props.createNewDialog}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: GlobalStateType): MapStateProps => {
    return{
        users: getUsersSelector(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isToggle: getIsToggle(state)
    }
}


export default compose(
    withAuthRedirect,
    connect<MapStateProps, MapDispatchProps, OwnProps, GlobalStateType>(mapStateToProps, {getUsersPage, followUser,
        unfollowUser, createNewDialog})
)(UsersContainer)
