import News from "./News";
import {connect} from "react-redux";
import {getCategoryData} from "../../redux/news-reducer";
import {useEffect} from "react";
import {compose} from "redux";
import {withRouter} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const NewsContainer = (props) => {

    useEffect(() => {
            props.getCategoryData(props.match.params.category)
    }, [props.match.params.category])

    return(
        <div>
            <News categories={props.categories}
                  getCategoryData={props.getCategoryData}
                  category={props.match.params.category}
            />
        </div>
    )
}

let mapStateToProps = (state) => {
    return{
        categories: state.newsPage.categories
    }
}



export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getCategoryData})
)(NewsContainer)