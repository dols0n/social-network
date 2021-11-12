import {useState, useEffect} from "react";




const ProfileStatusWithoutReduxForm = (props) => {
    let [editMode, changeEditMode] = useState(false)
    let [status, changeStatus] = useState(props.status)

    useEffect(() => {
        changeStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        changeEditMode(true)
    }
    let deactivateEditMode = () => {
        changeEditMode(false)
        props.updateUserStatus(status)
    }
    let onStatusChange = (event) => {
        changeStatus(event.currentTarget.value)
    }


    return(
        <div>
            {editMode ?
                <div>
                    <input value={status}
                           onChange={onStatusChange}
                           onBlur={deactivateEditMode}
                           autoFocus={true}
                    />
                </div>
            :
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status}
                    </span>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithoutReduxForm