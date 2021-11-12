import s from './PostElement.module.css'
import likeBtn from './../../../../assets/image/likeBtn.jpg'
import dislikeBtn from './../../../../assets/image/dislikeBtn.jpg'
import {postsObject} from "../../../../Types/types";
import {FC} from "react";

type Props = {
    post: postsObject
    likesUserPost: (id: number, isLikes: boolean) => void
    ownerUserPhoto: string
}

const PostElement: FC<Props> = (props) => {
    return(
        <div className={s.postElement}>
            <img className={s.photo} src={props.ownerUserPhoto} />
            <div className={s.message}>
                {props.post.postMessage}
            </div>
            <div className={s.likes}>
                {props.post.isLikes ?
                    <span onClick={() => {props.likesUserPost(props.post.id, false)}}><img className={s.button} src={likeBtn}/><span className={s.likeNumber}>{props.post.likes}</span></span>
                :
                    <span onClick={() => {props.likesUserPost(props.post.id, true)}}><img className={s.button} src={dislikeBtn}/><span className={s.dislikeNumber}>{props.post.likes}</span></span>
                }
            </div>

        </div>
    )
}


export default PostElement