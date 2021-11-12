import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getUserProfile, getUserStatus, updateUserStatus, updateProfileData,
    likesUserPost, addNewUserPost, updateUserPhoto, changeEditModeProfileData,
    updateProfileContacts, changeEditModeProfileContacts
} from "../../redux/profile-reducer";
import {deleteFormData} from "../../redux/redux-store";
import {createNewDialog} from "../../redux/dialogs-reducer";
import {getAuthUserData} from "../../redux/auth-reducer";
import Profile from "./Profile";
import {withRouter} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";





class ProfileContainer extends React.Component{
    refreshProfile = () => {
        let userId = this.props.match.params.userId
        if(!userId){
            userId = this.props.id
        }
        if(userId) {
            this.props.getUserStatus(userId)
            this.props.getUserProfile(userId)
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    render(){
        return(
            <div>
                <Profile profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         posts={this.props.posts}
                         likesUserPost={this.props.likesUserPost}
                         addNewUserPost={this.props.addNewUserPost}
                         updateUserPhoto={this.props.updateUserPhoto}
                         isOwner={!this.props.match.params.userId}
                         updateProfileData={this.props.updateProfileData}
                         editModeProfileData={this.props.editModeProfileData}
                         changeEditModeProfileData={this.props.changeEditModeProfileData}
                         updateProfileContacts={this.props.updateProfileContacts}
                         changeEditModeProfileContacts={this.props.changeEditModeProfileContacts}
                         editModeProfileContacts={this.props.editModeProfileContacts}
                         ownerUserPhoto={this.props.ownerUserPhoto}
                         createNewDialog={this.props.createNewDialog}
                         deleteFormData={this.props.deleteFormData}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        profile: state.profilePage.profile,
        status: state.profilePage.profileStatus,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        ownerUserPhoto: state.auth.ownerUserPhoto,
        posts: state.profilePage.posts,
        editModeProfileData: state.profilePage.editModeProfileData,
        editModeProfileContacts: state.profilePage.editModeProfileContacts
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getUserStatus, getAuthUserData,
        updateUserStatus, likesUserPost, addNewUserPost, updateUserPhoto, updateProfileData, changeEditModeProfileData,
        updateProfileContacts, changeEditModeProfileContacts, createNewDialog, deleteFormData}),
    withRouter
)(ProfileContainer)