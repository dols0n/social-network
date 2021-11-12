import s from './News.module.css'
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import NewsElement from "./NewsElement/NewsElement";
import {useEffect, useState} from "react";


const News = (props) => {

    const [amountNewsBlock, changeAmountNewsBlock] = useState(1)

    useEffect(() => {
        changeAmountNewsBlock(1)
    }, [props.category])

    if(!props.categories[props.category][0]){
        return <Preloader />
    }


    const createNewsBlock = (startElem, endElem) => {
        let newsBlockArray = props.categories[props.category].map((elem, index) => {
            if(index >= startElem && index <= endElem){
                return <NewsElement className={s.newsElement} newsPost={elem} />
            }
        })
        return <div className={s.newsBlock}>{newsBlockArray}</div>
    }

    const NewsBlock = () => {
        const allNewsBlock = []
        for(let i = 1; i <= amountNewsBlock; i++){
            let startElem = i * 4 - 4
            let endElem = i * 4 - 1
            allNewsBlock.push(createNewsBlock(startElem, endElem))
        }
        return allNewsBlock
    }

    const addNewsBlock = () => {
        changeAmountNewsBlock(amountNewsBlock + 1)
    }





    return(
        <div className={s.newsList}>
            <div className={s.categoryList}>
                {Object.keys(props.categories).map(category => {
                    return <NavLink to={`/news/${category}`}>
                        <div className={props.category === category ? s.activeCategory : s.category}>
                            {category.toUpperCase()}
                        </div>
                    </NavLink>
                })}
            </div>
            <div className={s.manyNewsBlocks}>
                {NewsBlock()}
            </div>
            <div>
                <button className={s.moreNewsButton} onClick={() => {addNewsBlock()}}>MORE NEWS</button>
            </div>
        </div>
    )
}

export default News