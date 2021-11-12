import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component{
    render(){
        return(
            <div>
                <Header isAuth={this.props.isAuth}
                        logout={this.props.logout}
                        ownerUserPhoto={this.props.ownerUserPhoto}
                        fullName={this.props.fullName}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth,
        ownerUserPhoto: state.auth.ownerUserPhoto,
        fullName: state.auth.fullName
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer)