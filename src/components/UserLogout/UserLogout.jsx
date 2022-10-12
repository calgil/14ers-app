import React, { useContext } from "react";
import s from "./UserLogout.module.css";
import {
    Link, 
    useNavigate,
} from "react-router-dom";
import { UserContext } from "../../App";

const UserLogout = () => {
    const { authService, updateAuth } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        authService.logoutUser()
            updateAuth();
            navigate("/");
    }

    return (
        <div className={s.logoutBody}>
            <h3>Are you sure you want to logout?</h3>
            <div className={s.buttons}>
                <button 
                    className={s.logout}
                    onClick={logout}
                >
                    Yes, logout
                </button>
                <button
                    className={s.home}
                >
                    <Link to='/'>No, return home</Link>
                </button>
            </div>
        </div>
    )
}

export default UserLogout;