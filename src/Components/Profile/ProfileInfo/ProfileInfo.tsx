import styles from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import userPhoto from './../../../assets/image/user.png'
import ProfileInfoData from "./ProfileInfoData/ProfileInfoData";
import {FC, useState} from "react";
import {NavLink} from "react-router-dom";
import {profileObject} from "../../../Types/types";

type Props = {
    profile: profileObject
    status: string | null
    updateUserStatus: (status: string) => void
    updateUserPhoto: (photo: any) => void
    isOwner: boolean
    updateProfileData: (profile: profileObject) => void
    editModeProfileData: boolean
    changeEditModeProfileData: (editModeProfileData: boolean) => void
    changeEditModeProfileContacts: (editModeProfileContacts: boolean) => void
    updateProfileContacts: (profile: profileObject) => void
    editModeProfileContacts: boolean
    createNewDialog: (userId: number, userSmallPhoto: string | null, fullName: string) => void
}

const ProfileInfo: FC<Props> = (props) => {
    let [showDetailedInformation, changeShowDetailedInformation] = useState(false)

    let updateUserPhoto = (event: any) => {
        if(event.target.files.length){
            props.updateUserPhoto(event.target.files[0])
        }
    }


    return(
        <div className={styles.profileInfo}>
            <div className={styles.ownerUserPhoto}>
                {props.profile.photos.large ?
                    <img className={styles.avatar} src={props.profile.photos.large} />
                :
                    <img className={styles.avatar} src={userPhoto} />
                }
                {props.isOwner ?
                    <label className={styles.inputPhoto}>
                        Edit Photo
                        <input type={'file'} onChange={updateUserPhoto}/>
                    </label>
                :
                    <NavLink  className={styles.inputPhoto} to={`/dialogs/${props.profile.userId}`}>
                        <label>
                            Send message
                            <span onClick={() => {props.createNewDialog(props.profile.userId, props.profile.photos.small, props.profile.fullName)}}/>
                        </label>
                    </NavLink>
                }
            </div>
            <div className={styles.profileInfoBlock}>
                <div className={styles.profileTitle}>
                    <div className={styles.fullName}>
                        <h3>{props.profile.fullName}</h3>
                    </div>
                    <div className={styles.userStatus}>
                        <ProfileStatus status={props.status}
                                       updateUserStatus={props.updateUserStatus}
                                       isOwner={props.isOwner}
                        />
                    </div>
                </div>
                <div className={styles.buttonChangedInfoBlock}>
                    {showDetailedInformation ?
                        <button className={styles.buttonChangedInfo} onClick={() => {changeShowDetailedInformation(false)}}>
                            Hide detailed information
                        </button>
                    :
                        <button className={styles.buttonChangedInfo} onClick={() => {changeShowDetailedInformation(true)}}>Show detailed information</button>}
                </div>
                <div className={showDetailedInformation ? styles.showProfileInfoData : styles.hideProfileInfoData}>
                    <ProfileInfoData profile={props.profile}
                                     isOwner={props.isOwner}
                                     updateProfileData={props.updateProfileData}
                                     editModeProfileData={props.editModeProfileData}
                                     changeEditModeProfileData={props.changeEditModeProfileData}

                                     updateProfileContacts={props.updateProfileContacts}
                                     changeEditModeProfileContacts={props.changeEditModeProfileContacts}
                                     editModeProfileContacts={props.editModeProfileContacts}
                    />

                </div>
            </div>
        </div>
    )
}



export default ProfileInfo