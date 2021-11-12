import './App.css'
import React from "react";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import LoginContainer from "./Components/Login/LoginContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import NewsContainer from "./Components/News/NewsContainer";
import {initializedApp} from "./redux/app-reducer";
import {connect} from "react-redux";
import Preloader from "./Components/common/Preloader/Preloader";
import {Redirect} from "react-router";

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));


class App extends React.Component{
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if(!this.props.initialized){
            return <Preloader />
        }

        return (
            <HashRouter basename={process.env.PUBLIC_URL}>
                <div className='app'>
                    <div className='header'>
                        <div className='working-header'>
                            <HeaderContainer/>
                        </div>
                    </div>
                    <div className='navbarAndProfile'>
                        <div className='navbar'>
                            <NavbarContainer/>
                        </div>
                        <div className='profile'>
                            <Route path={'/profile/:userId?'}
                                   render={() => <ProfileContainer/>}
                            />
                            <Route path={'/dialogs/:userId?'} render={() =>
                                <React.Suspense fallback={<Preloader/>}>
                                    <DialogsContainer/>
                                </React.Suspense>
                            }
                            />
                            <Route path={'/users'} render={() =>
                                <React.Suspense fallback={<Preloader/>}>
                                    <UsersContainer/>
                                </React.Suspense>
                            }
                            />
                            <Route path={'/login'} render={() =>
                                <LoginContainer/>}
                            />
                            <Route path={'/news/:category'} render={() =>
                                <React.Suspense fallback={<Preloader/>}>
                                    <NewsContainer/>
                                </React.Suspense>
                            }
                            />
                            <Route path={''} render={() =>
                                <Redirect to={'/login'}/>}
                            />

                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}


let mapStateToProps = (state) => {
    return{
        initialized: state.app.initialized
    }
}


const AppContainer = connect(mapStateToProps, {initializedApp})(App);

export default AppContainer
