import s from './Header.module.css'
import ampersandlogo from './../../assets/image/ampersandlogo.png'

import React, {useEffect, useState} from "react";


const Header = (props) => {

    let [openMenu, changeOpenMenu] = useState(false)


    let logoutUser = () => {
        props.logout()
    }

    return(
        <div className={s.header}>
            <div  className={s.logo}>
                <img src={ampersandlogo}/>
                <h3>ampersand</h3>
            </div>
            {props.isAuth ?
                <span className={s.userPhoto} onClick={() => {changeOpenMenu(true)}} onBlur={() => {changeOpenMenu(false)}}>
                    {openMenu ?
                        <button onClick={() => {logoutUser()}}>Logout</button>
                    :
                        <span>
                            <n>{props.fullName}</n>
                            <img src={props.ownerUserPhoto} />
                        </span>
                    }

                </span>
            : null}

        </div>
    )
}

export default Header