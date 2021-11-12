import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Dialogs from "./Dialogs";
import {withRouter} from "react-router";
import {createNewDialog, createNewDialogWithRequestPhoto, sendMessage} from "../../redux/dialogs-reducer";
import {deleteFormData} from "../../redux/redux-store";
import DialogsList from "./DialogsList/DialogsList";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const DialogsContainer = (props) => {
    const userId = props.match.params.userId


    if(!props.usersDialogs[userId] || !props.usersDialogs[userId].userSmallPhoto){
        if(userId) {
            props.createNewDialogWithRequestPhoto(userId)
        }
    }
    return(
        <div>
            {userId ?
                <Dialogs usersDialogs={props.usersDialogs}
                         userId={userId}
                         sendMessage={props.sendMessage}
                         userPhoto={props.userPhoto}
                         ownerFullName={props.ownerFullName}
                         deleteFormData={props.deleteFormData}
                />
            :
                <DialogsList usersDialogs={props.usersDialogs}
                             userPhoto={props.userPhoto}
                />
            }
        </div>
    )
}

let mapStateToProps = (state) => {
    return{
        usersDialogs: state.dialogsPage.usersDialogs,
        myUserId: state.auth.id,
        userPhoto: state.auth.ownerUserPhoto,
        ownerFullName: state.auth.fullName,
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {createNewDialog, createNewDialogWithRequestPhoto, sendMessage,
    deleteFormData}),
    withRouter
)(DialogsContainer)


