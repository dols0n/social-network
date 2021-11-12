import s from './NewsElement.module.css'


const NewsElement = (props) => {
    return(
        <div className={s.newsElement}>
            <div>
                <img className={s.newsImage} src={props.newsPost.imageUrl} />
            </div>
            <div className={s.newsAuthor}>
                <b>{props.newsPost.author}</b>
            </div>
            <div>
                {props.newsPost.content}
            </div>
        </div>
    )
}


export default NewsElement