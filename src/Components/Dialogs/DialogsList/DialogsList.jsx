import s from './DialogsList.module.css'
import DialogElementList from "./DialogElementList/DialogElementList";





const DialogsList = (props) => {
    let keys = Object.keys(props.usersDialogs)
    if(!keys[0]){
        return <div>You have no messages yet</div>
    }
    return(
        <div className={s.dialogList}>
            {keys.map(key => {
                return(
                    <div className={s.dialogElement}>
                        <DialogElementList usersDialog={props.usersDialogs[key]}
                                           userId={key}
                                           userPhoto={props.userPhoto}
                        />
                    </div>
                )
            })}
        </div>
    )
}


export default DialogsList