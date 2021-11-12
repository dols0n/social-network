import s from './Profile.module.css'
import Preloader from "../common/Preloader/Preloader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import UserPosts from "./UserPosts/UserPosts";
import {postsObject, profileObject} from "../../Types/types";
import {FC} from "react";


type Props = {
    profile: profileObject
    status: string | null
    updateUserStatus: (status: string) => void
    posts: Array<postsObject>
    likesUserPost: (id: number, isLikes: boolean) => void
    addNewUserPost: (postMessage: string) => void
    updateUserPhoto: (photo: any) => void
    isOwner: boolean
    updateProfileData: (profile: profileObject) => void
    editModeProfileData: boolean
    changeEditModeProfileData: (editModeProfileData: boolean) => void
    updateProfileContacts: (profile: profileObject) => void
    changeEditModeProfileContacts: (editModeProfileContacts: boolean) => void
    editModeProfileContacts: boolean
    ownerUserPhoto: string
    createNewDialog: (userId: number, userSmallPhoto: string | null, fullName: string) => void
    deleteFormData: () => void
}

const Profile: FC<Props> = (props) => {
    if(!props.profile){
        return <Preloader />
    }
    return(
        <div className={s.profile}>
            <div className={s.profileInfo}>
                <ProfileInfo profile={props.profile}
                             status={props.status}
                             updateUserStatus={props.updateUserStatus}
                             updateUserPhoto={props.updateUserPhoto}
                             isOwner={props.isOwner}
                             updateProfileData={props.updateProfileData}
                             editModeProfileData={props.editModeProfileData}
                             changeEditModeProfileData={props.changeEditModeProfileData}
                             changeEditModeProfileContacts={props.changeEditModeProfileContacts}
                             updateProfileContacts={props.updateProfileContacts}
                             editModeProfileContacts={props.editModeProfileContacts}
                             createNewDialog={props.createNewDialog}
                />
            </div>
            <div className={s.profilePosts}>
                <UserPosts posts={props.posts}
                           likesUserPost={props.likesUserPost}
                           addNewUserPost={props.addNewUserPost}
                           ownerUserPhoto={props.ownerUserPhoto}
                           deleteFormData={props.deleteFormData}
                />
            </div>
        </div>
    )
}


export default Profile