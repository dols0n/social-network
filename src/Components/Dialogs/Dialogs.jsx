import s from './Dialogs.module.css'
import Preloader from "../common/Preloader/Preloader";
import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";


const DialogElement = (props) => {


    return(
        <div>

                {props.messageObject.myMessage ?
                    <div className={s.dialogElement}>
                        <img className={s.userPhoto} src={props.userPhoto} />
                        <b className={s.ownerFullName}>{props.ownerFullName}</b>
                        <span className={s.message}>{props.messageObject.message}</span>
                    </div>
                :
                    <div className={s.dialogElement}>
                        <img className={s.userPhoto} src={props.userSmallPhoto} />
                        <b className={s.ownerFullName}>{props.fullName}</b>
                        <span className={s.message}>{props.messageObject.message}</span>
                    </div>
                }
        </div>
    )
}

const InputMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.inputField} placeholder={'your message'} name={'message'} component={'input'} />
                <button className={s.buttonField}>Send</button>
            </div>

        </form>
    )
}

const InputMessageReduxForm = reduxForm({form: 'messageForm'})(InputMessageForm)

const Dialogs = (props) => {   // Dialog
    if(!props.usersDialogs[props.userId]){
        return <Preloader />
    }

    const sendMessage = (value) => {
        props.sendMessage(value.message, props.userId)
        props.deleteFormData()
    }

    return(
        <div className={s.dialogs}>
            <div className={s.headerDialog}>
                <NavLink to={'/dialogs'}>
                    <button className={s.headerButton}>Back</button>
                </NavLink>
                <NavLink className={s.headerFullName} to={`/profile/${props.userId}`}>
                    <b>{props.usersDialogs[props.userId].fullName}</b>
                </NavLink>
                <NavLink className={s.headerUserPhoto} to={`/profile/${props.userId}`}>
                    <img src={props.usersDialogs[props.userId].userSmallPhoto} />
                </NavLink>
            </div>
            <div className={s.dialogElementBLock}>
                {props.usersDialogs[props.userId].messages[0] ?
                    props.usersDialogs[props.userId].messages.map(messageObject => {
                        return <DialogElement messageObject={messageObject}
                                              userSmallPhoto={props.usersDialogs[props.userId].userSmallPhoto}
                                              userPhoto={props.userPhoto}
                                              fullName={props.usersDialogs[props.userId].fullName}
                                              ownerFullName={props.ownerFullName}
                        />
                    })
                :
                    <div className={s.noMessage}>there are no messages here yet</div>
                }
            </div>
            <div className={s.formField}>
                <InputMessageReduxForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
}


export default Dialogs