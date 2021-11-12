import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";

class NavbarContainer extends React.Component{
    render(){
        return(
            <div>
                <Navbar
                    isAuth={this.props.isAuth}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {})(NavbarContainer)