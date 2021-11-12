import {NavLink} from "react-router-dom";
import s from './DialogElementList.module.css'
import image from './../../../../assets/image/postPhoto.jpg'


const DialogElementList = (props) => {

    const smallMessageImage = () => {
        if(props.usersDialog.messages[0]){
            if(props.usersDialog.messages[props.usersDialog.messages.length - 1].myMessage){
                return <div>
                    <img className={s.smallMessageImage} src={props.userPhoto}/>
                    <span className={s.messageText}>{props.usersDialog.messages[props.usersDialog.messages.length - 1].message}</span>
                </div>
            }
            return <div>
                <img className={s.smallMessageImage} src={props.usersDialog.userSmallPhoto}/>
                <span className={s.messageText}>{props.usersDialog.messages[props.usersDialog.messages.length - 1].message}</span>
            </div>
        }
        return <div className={s.noMessageAlert}>you have not written to this user, WRITE TO HIM!</div>
    }

    return (
        <NavLink to={`/dialogs/${props.userId}`} className={s.dialogElementList}>
            <div className={s.photoBlock}>
                    <img className={s.userPhoto} src={props.usersDialog.userSmallPhoto}/>
            </div>
            <div className={s.fullName}>
                {props.usersDialog.fullName}
            </div>

            <div className={s.messages}>
                {smallMessageImage()}
            </div>

        </NavLink>
    )
}


export default DialogElementList