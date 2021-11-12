import s from './ProfileInfoData.module.css'
import {Field, reduxForm} from "redux-form";
import {FC} from 'react'
import {profileObject} from "../../../../Types/types";




const ProfileInfoDataForm = (props: any) => {
    return(
        <form className={s.profileInfoDataForm} onSubmit={props.handleSubmit}>
            <div>
                <button className={s.btnProfileInfoDataForm}>Save</button>
            </div>
            <div>
                <p>Fullname: <u><Field placeholder={'Your Fullname'} name={'fullName'} component={'input'} /></u></p>
            </div>
            <div>
                <p>About Me: <u><Field placeholder={'Information about you'} name={'aboutMe'} component={'input'} /></u></p>
            </div>
            <div className={s.lookingForAJob}>
                <p>Looking for a job: <u><Field name={'lookingForAJob'} component={'input'} type={'checkbox'} /></u></p>
            </div>
            <div>
                <p>My skills: <u><Field placeholder={'Your skills'} name={'lookingForAJobDescription'} component={'input'} /></u></p>
            </div>


        </form>
    )
}

const ProfileInfoDataReduxForm = reduxForm({form: 'profileInfoForm'})(ProfileInfoDataForm)

const ProfileContactsDataForm = (props: any) => {
    return(
        <form className={s.profileInfoDataForm} onSubmit={props.handleSubmit}>
            <div>
                <button className={s.btnProfileContactsDataForm}>Save</button>
            </div>
            <div className={s.editContactsList}>
                {Object.keys(props.profile.contacts).map(elem => {
                    return <li>{elem}: <Field placeholder={`${elem}`}
                                          name={'contacts.' + elem}
                                          component={'input'}
                />
                    {props.error ?
                        // @ts-ignore
                        props.error.includes([...elem].map((letter, index) => {
                            if (index === 0) {
                                return letter.toUpperCase()
                            }
                            return letter
                        }).join(''), 30) && <>{props.error}</>
                        : null
                    }
                </li>
            })}
            </div>
        </form>
    )
}

const ProfileContactsDataReduxForm = reduxForm({form: 'profileContactsForm'})(ProfileContactsDataForm)

type Props = {
    profile: profileObject
    isOwner: boolean
    updateProfileData: (profile: profileObject) => void
    editModeProfileData: boolean
    changeEditModeProfileData: (editModeProfileData: boolean) => void
    updateProfileContacts: (profile: profileObject) => void
    changeEditModeProfileContacts: (editModeProfileContacts: boolean) => void
    editModeProfileContacts: boolean
}


const ProfileInfoData: FC<Props> = (props) => {
    /*
    updateProfileContacts
    changeEditModeProfileContacts
    editModeProfileContacts
    */

    let saveModifiedProfileData: any = (value: profileObject) => {
        props.updateProfileData(value)
    }
    let saveModifiedProfileContacts: any = (value: profileObject) => {
        props.updateProfileContacts(value)
    }

    return(
        <div className={s.profileInfoData}>
            <div className={s.profileInfo}>
                <div className={s.infoTitle}>
                    <div className={s.infoTitleText}>
                        Detailed information
                    </div>
                    <div className={s.infoTitleLine}>
                        <div></div> {/*has a border line at the prodile data*/}
                        {props.isOwner ?
                            <span onClick={() => {
                                props.changeEditModeProfileData(true)
                            }}
                                  className={props.editModeProfileData || props.editModeProfileContacts ?
                                      s.hideInfoTitleEditSpan
                                      :
                                      s.infoTitleEditSpan}>
                            Edit
                        </span>
                            :
                            null}
                    </div>
                </div>
                {props.editModeProfileData ?
                    <div>
                        <ProfileInfoDataReduxForm onSubmit={saveModifiedProfileData}
                                                  initialValues={props.profile}
                                                  //profile={props.profile}
                        />
                    </div>
                    :
                    <div>
                        <div>
                            <p>Fullname: <u>{props.profile.fullName}</u></p>
                        </div>
                        <div>
                            <p>About Me: <u>{props.profile.aboutMe ?
                                props.profile.aboutMe
                                : "Not indicate"}</u>
                            </p>
                        </div>
                        <div>
                            <p>Looking for a job: <u>{props.profile.lookingForAJob ?
                                "seeking"
                                : "not seeking"}</u>
                            </p>
                        </div>
                        <div>
                            <p>My skills: <u>{props.profile.lookingForAJobDescription ?
                                props.profile.lookingForAJobDescription
                                : "Not indicate"}</u>
                            </p>
                        </div>
                    </div>
                }
            </div>
            <div className={props.editModeProfileData ? s.moveProfileContacts : s.profileContacts}>
                <div className={s.infoTitle}>
                    <div className={s.infoTitleText}>
                        Contacts
                    </div>
                    <div className={s.infoContactsLine}>
                        <div></div>     {/*has a border line at the contacts*/}
                        {props.isOwner ?
                            <span onClick={() => {
                                props.changeEditModeProfileContacts(true)
                            }}
                                  className={props.editModeProfileContacts ?
                                      s.hideInfoTitleEditSpan
                                      :
                                      s.infoTitleEditSpan}>
                            Edit
                        </span>
                            :
                            null}
                    </div>
                </div>
                {props.editModeProfileContacts ?
                    <div>
                        {/*
                        // @ts-ignore  */}
                        <ProfileContactsDataReduxForm profile={props.profile}
                                                      onSubmit={saveModifiedProfileContacts}
                                                      initialValues={props.profile}
                        />
                    </div>
                    :
                    <div className={s.contactsList}>
                        {Object.keys(props.profile.contacts).map(elem => {
                            if(props.profile.contacts[elem]) {
                                return <li>{elem}: <a>{props.profile.contacts[elem]}</a></li>
                            }else {
                                return <li>{elem}: <a>not indicate</a></li>
                            }
                    })}
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfileInfoData






/*
import s from './ProfileInfoData.module.css'
import {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {changeEditModeProfileData, updateProfileData} from "../../../../redux/profile-reducer";

const ProfileInfoDataForm = (props) => {
    return(
        <form className={s.profileInfoDataForm} onSubmit={props.handleSubmit}>
            <div>
                <button className={s.btnProfileInfoDataForm}>Save</button>
            </div>
            <div>
                <p>Fullname: <n><Field placeholder={'Your Fullname'} name={'fullName'} component={'input'} /></n></p>
            </div>
            <div>
                <p>About Me: <n><Field placeholder={'Information about you'} name={'aboutMe'} component={'input'} /></n></p>
            </div>
            <div>
                <p>Looking for a job: <n><Field name={'lookingForAJob'} component={'input'} type={'checkbox'} /></n></p>
            </div>
            <div>
                <p>My skills: <n><Field placeholder={'Your skills'} name={'lookingForAJobDescription'} component={'input'} /></n></p>
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map(elem => {
                return <li>{elem}: <Field placeholder={`${elem}`}
                                          name={'contacts.' + elem}
                                          component={'input'}
                />
                    {props.error ?
                            props.error.includes([...elem].map((letter, index) => {
                                if (index === 0) {
                                    return letter.toUpperCase()
                                }
                                return letter
                            }).join(''), 30) && <>{props.error}</>
                    : null
                    }
                </li>
            })}
            </div>
        </form>
    )
}

const ProfileInfoDataReduxForm = reduxForm({form: 'profileInfoForm'})(ProfileInfoDataForm)

const ProfileInfoData = (props) => {


    let saveModifiedProfileData = (value) => {
        props.updateProfileData(value)
    }

    return(
        <div className={s.profileInfoData}>
            <div className={s.infoTitle}>
                <div className={s.infoTitleText}>
                    Detailed information
                </div>
                <div className={s.infoTitleLine}>
                    <div></div>
                    {props.isOwner ?
                        <span onClick={() => {props.changeEditModeProfileData(true)}}
                              className={props.editModeProfileData ?
                                  s.hideInfoTitleEditSpan
                              :
                                  s.infoTitleEditSpan}>
                            Edit
                        </span>
                    :
                        null}
                </div>
            </div>
            {props.editModeProfileData ?
                <ProfileInfoDataReduxForm onSubmit={saveModifiedProfileData}
                                          initialValues={props.profile}
                                          profile={props.profile}
                />
            :
                <div>
                    <div>
                        <p>Fullname: <n>{props.profile.fullName}</n> </p>
                    </div>
                    <div>
                        <p>About Me: <n>{props.profile.aboutMe ?
                            props.profile.aboutMe
                            : "Not indicate"}</n>
                        </p>
                    </div>
                    <div>
                        <p>Looking for a job: <n>{props.profile.lookingForAJob ?
                            "seeking"
                            : "not seeking"}</n>
                        </p>
                    </div>
                    <div>
                        <p>My skills: <n>{props.profile.lookingForAJobDescription ?
                            props.profile.lookingForAJobDescription
                            : "Not indicate"}</n>
                        </p>
                    </div>
                    <div>
                        <b>Contacts:</b> {Object.keys(props.profile.contacts).map(elem => {
                        return <li>{elem}: {props.profile.contacts[elem] ?
                            props.profile.contacts[elem]
                            : "Not indicate"}
                        </li>
                    })}
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileInfoData

 */