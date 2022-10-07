import React, { useContext } from "react";
import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import { UserContext } from "../../App";
import logo from "../../assets/logo.svg"


const Navbar = () => {
    const { authService } = useContext(UserContext);

    return (
        <div className={s.navbar}>
            <div className={s.logoContainer}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <ul className={s.navLinks}>
                <li>Peaks</li>
                <li>Routes</li>
                <li>Ranges</li>
            </ul>
            <div>
            { authService.name
                ? authService.name
                : <Link className={s.login} to="/login">Login</Link>
            }
            </div>
        </div>
    )
}

export default Navbar;