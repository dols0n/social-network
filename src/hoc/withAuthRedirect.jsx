import {connect} from "react-redux";
import {Redirect} from "react-router";

export const withAuthRedirect = (Component) => {
    let redirectComponent = (props) => {
        if(!props.isAuth){
            return <Redirect to={'/login'}/>
        }
        return <Component {...props} />
    }
    let mapStateToProps = (state) => {
        return{
            isAuth: state.auth.isAuth
        }
    }
    let connectedAuthRedirectComponent = connect(mapStateToProps, {})(redirectComponent)

    return connectedAuthRedirectComponent
}

export const loginAuthRedirect = (Component) => {
    let redirectComponent = (props) => {
        if(props.isAuth){
            return <Redirect to={'/profile'}/>
        }
        return <Component {...props} />
    }
    let mapStateToProps = (state) => {
        return{
            isAuth: state.auth.isAuth
        }
    }
    let connectedAuthRedirectComponent = connect(mapStateToProps, {})(redirectComponent)

    return connectedAuthRedirectComponent
}



