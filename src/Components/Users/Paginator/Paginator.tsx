import s from "./Paginator.module.css";
import {useState, FC} from "react";
import left from './../../../assets/image/paginatorleft.png'
import right from './../../../assets/image/paginatorright.jpg'

type Props = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (currentPage: number) => void
    currentPage: number
}

const Paginator: FC<Props> = (props) => {

    let [portionNumber, changePortionNumber] = useState(0)

    let nextPortionNumber = () => {
        changePortionNumber(portionNumber + 1)
        props.onPageChanged(startPageCount + 10)
    }
    let previousPortionNumber = () => {
        changePortionNumber(portionNumber - 1)
        props.onPageChanged(startPageCount - 10)
    }

    let totalPageCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let startPageCount = 10 * portionNumber + 1
    let finishPageCount = startPageCount + 9
    if(finishPageCount > totalPageCount){
        finishPageCount = totalPageCount
    }
    let pageNumberList = []
    for(let i = startPageCount; i <= finishPageCount; i++){
        pageNumberList.push(i)
    }
    return(
        <div>
            <button className={s.paginatorButton}
                onClick={() => {previousPortionNumber()}}
                disabled={portionNumber === 0 ? true : false}
            >
                <img className={s.paginatorImg} src={left}/></button>
            {pageNumberList.map(elem => {
                return <span
                    onClick={() => {props.onPageChanged(elem)}}
                    className={props.currentPage === elem ? s.activeMode : s.spanElement}
                >
                        <div className={s.numberBlock}>{elem}</div></span>
            })}
            <button className={s.paginatorButton}
                onClick={() => {nextPortionNumber()}}
                    disabled={finishPageCount === totalPageCount ? true : false}
            >
                <img className={s.paginatorImg} src={right}/></button>
        </div>
    )
}

export default Paginator