import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import s from "./User.module.css";
import {
    Link
} from "react-router-dom";

const User = () => {
    const { authService } = useContext(UserContext);
    const [ showLinks, setShowLinks ] = useState(false);

    return (
        <div className={s.userContainer}>
            <div className={s.user}>
                <h5 className={s.username}>{authService.name}</h5>
                <button
                    onClick={() => setShowLinks(!showLinks)}
                    className={s.arrow}
                >
                    {/* { !showLinks ? '⬇️' : '⬆️' } */}
                    { !showLinks 
                        ? <i className="fa fa-caret-down"></i> 
                        : <i className="fa fa-caret-up"></i> 
                    }
                </button>
            </div>
            
            {
                showLinks && 
                <div
                    className={s.userLinks}
                >
                    <Link to='/edit'>Edit</Link>
                    <Link to='/logout'>Logout</Link>
                </div>
            }
        </div>
    )
}

export default User;