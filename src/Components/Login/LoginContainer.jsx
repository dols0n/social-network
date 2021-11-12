import React from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router'
import {login} from "../../redux/auth-reducer";
import Login from "./Login";
import {compose} from "redux";
import {loginAuthRedirect} from "../../hoc/withAuthRedirect";


class LoginContainer extends React.Component{
    render(){
        return(
            <div>
                <Login login={this.props.login}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth
    }
}

export default compose(
    loginAuthRedirect,
    connect(mapStateToProps, {login}))
(LoginContainer)