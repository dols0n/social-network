import s from './UserElement.module.css';
import {FC} from 'react'
import userPhoto from "../../../assets/image/user.png";
import {NavLink} from "react-router-dom";
import {userObject} from "../../../Types/types";

type Props = {
    user: userObject
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    isToggle: [index: boolean, index: null | number]
    createNewDialog: (userId: number, userSmallPhoto: string | null, fullName: string) => void
}

const UserElement: FC<Props> = (props) => {
    return(
        <div className={s.userElement}>
            <div className={s.userPhoto}>
                <NavLink to={`/profile/${props.user.id}`}>
                    {props.user.photos.small ?
                        <img className={s.avatar} src={props.user.photos.small}/>
                        :
                        <img className={s.avatar} src={userPhoto} />
                    }
                </NavLink>
            </div>
            <label  className={s.fullName}>
                <NavLink className={s.fullName} to={`/profile/${props.user.id}`}>
                    <b>{props.user.name}</b>
                </NavLink>
            </label>
            <div className={s.followButton}>
                {props.user.followed ?
                    <div>
                        <button onClick={() => {props.unfollowUser(props.user.id)}}
                                disabled={props.isToggle[1] === props.user.id ? props.isToggle[0] : false}>
                            UNFOLLOW
                        </button>
                    </div>
                :
                    <div>
                        <button onClick={() => {props.followUser(props.user.id)}}
                                disabled={props.isToggle[1] === props.user.id ? props.isToggle[0] : false}>
                            FOLLOW
                        </button>
                    </div>
                }
            </div>
            <div className={s.sendSpan}>
                <NavLink to={`/dialogs/${props.user.id}`}>
                    <span onClick={() => {props.createNewDialog(props.user.id, props.user.photos.small, props.user.name)}}>
                        Write a message</span>
                </NavLink>
            </div>
        </div>
    )
}

export default UserElement