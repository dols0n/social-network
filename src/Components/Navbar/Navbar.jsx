import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import messages from './../../assets/image/message.svg'
import profile from './../../assets/image/profile.svg'
import users from './../../assets/image/users.svg'
import news from './../../assets/image/news.svg'





const Navbar = (props) => {
    return(
        props.isAuth ?
                <div className={styles.navbar}>
                    <div>
                        <NavLink to='/profile'><img src={profile}/><span>Profile</span></NavLink>
                    </div>
                    <div>
                        <NavLink to='/dialogs'><img src={messages}/><span>Dialogs</span></NavLink>
                    </div>
                    <div>
                        <NavLink to='/users'><img src={users}/><span>Users</span></NavLink>
                    </div>
                    <div>
                        <NavLink to='/news/all'><img src={news}/><span>News</span></NavLink>
                    </div>
                </div>
        : null

    )
}



export default Navbar