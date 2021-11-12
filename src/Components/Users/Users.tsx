import s from './Users.module.css'
import {FC} from 'react'
import UserElement from "./UserElement/UserElement";
import Paginator from "./Paginator/Paginator";
import {userObject} from "../../Types/types";


type Props = {
    users: Array<userObject>
    totalUsersCount: number
    currentPage: number
    pageSize: number
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    onPageChanged: (currentPage: number) => void
    isToggle: [index: boolean, index: null | number]
    createNewDialog: (userId: number, userSmallPhoto: string | null, fullName: string) => void
}

const Users: FC<Props> = (props) => {

    return(
        <div>
            <div className={s.paginator}>
                <Paginator totalUsersCount={props.totalUsersCount}
                           pageSize={props.pageSize}
                           onPageChanged={props.onPageChanged}
                           currentPage={props.currentPage}
                />
            </div>
            <div>
                {props.users.map(elem => {
                    return <UserElement user={elem}
                                        followUser={props.followUser}
                                        unfollowUser={props.unfollowUser}
                                        isToggle={props.isToggle}
                                        createNewDialog={props.createNewDialog}
                    />
                })}
            </div>
        </div>
    )
}


export default Users