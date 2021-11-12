import s from './UserPosts.module.css'
import React, {FC, useState} from "react";
import PostElement from "./PostElement/PostElement";
import {Field, reduxForm} from "redux-form";
import {postsObject} from "../../../Types/types";

const UserPostForm = (props: any) => {
    let [editMessage, changeEditMessage] = useState(false)
    return(
        editMessage ?
            <form onSubmit={props.handleSubmit} /*tabIndex={'0'}*/ className={s.form}>
                <div className={s.fieldBlock}>
                    <img className={s.fieldPhoto} src={props.ownerUserPhoto}/>
                    <Field className={s.fieldTextarea} placeholder={'Anything new?'} name={'post'} component={'textarea'}/>
                </div>
                    <button className={s.fieldButton}>Publish</button>
            </form>
        :
            <form onSubmit={props.handleSubmit}
                  /*tabIndex="0"*/
                  onClick={() => {changeEditMessage(true)}}
                  className={s.form}>

                <img className={s.fieldPhoto} src={props.ownerUserPhoto}/>
                <Field className={s.fieldTextarea} placeholder={'Anything new?'} name={'post'}
                       component={'textarea'}/>
            </form>

    )
}

const UserPostReduxForm = reduxForm({form: 'userPost'})(UserPostForm)

type Props = {
    posts: Array<postsObject>
    likesUserPost: (id: number, isLikes: boolean) => void
    addNewUserPost: (postMessage: string) => void
    ownerUserPhoto: string
    deleteFormData: () => void
}


const UserPosts: FC<Props> = React.memo((props) => {
        let addNewUserPost = (value: any) => {
            props.addNewUserPost(value.post)
            props.deleteFormData()
        }

        let copyPosts = [...props.posts].reverse()
        console.log("RENDER")
        return (
            <div className={s.mainPage}>
                <div>
                    {/*
                        //@ts-ignore */}
                    <UserPostReduxForm  ownerUserPhoto={props.ownerUserPhoto}
                                        onSubmit={addNewUserPost}

                    />
                </div>
                <div className={s.usersPosts}>
                    {copyPosts.map(elem => {
                        return <div className={s.postElement}><PostElement
                                            post={elem}
                                            likesUserPost={props.likesUserPost}
                                            ownerUserPhoto={props.ownerUserPhoto}
                        /></div>
                    })}
                </div>
            </div>
        )
    }
)

export default UserPosts