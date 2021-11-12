import s from './ProfileStatus.module.css'
import React from "react";
import {Field, reduxForm} from "redux-form";
import {useState, FC} from "react";

const StatusForm = (props: any) => {
    return(
        <form onSubmit={props.handleSubmit}>
                <Field className={s.statusField} name={'status'} component={'input'}
                />

            <div>
                <Field className={s.buttonField} name={'button'} component={'button'}>SAVE </Field>
            </div>
        </form>
    )
}

const StatusReduxForm = reduxForm({form:'statusForm'})(StatusForm)


type Props = {
    status: string | null
    updateUserStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatus: FC<Props> = (props) => {

    let [editMode, changeEditMode] = useState(false)


    let activateEditMode = () => {
        changeEditMode(true)
    }
    let deactivateEditMode = () => {
        changeEditMode(false)
    }
    let updateStatus = (value: any) => {
        deactivateEditMode()
        props.updateUserStatus(value.status)
    }

    return (
        <div className={s.userStatus}>
            {editMode ?
                <div onBlur={deactivateEditMode}>
                    <StatusReduxForm onSubmit={updateStatus}
                                     initialValues={{status: props.status}}
                    />
                </div>
                :
                <div>
                    <span className={s.statusSpan} onDoubleClick={props.isOwner ? activateEditMode : () => {return null}}>{props.status}</span>
                </div>
            }
        </div>
    )
}



export default ProfileStatus