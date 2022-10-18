import React, { useContext } from "react";
import { 
    Link,
    NavLink,
 } from "react-router-dom";
import s from "./Navbar.module.css";
import { UserContext } from "../../App";
import logo from "../../assets/logo.svg"
import DisplayUser from "../DisplayUser/DisplayUser";


const Navbar = () => {
    const { authService } = useContext(UserContext);


    return (
        <nav className={s.nav}>
            <div className={s.navbar}>
                <div className={s.leftCol}>
                    <div className={s.logoContainer}>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>

                    <ul className={s.navLinks}>
                        <NavLink
                            to={'/'}
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.navLink} ${s.active}`
                                    : `${s.navLink}`
                        }
                        >
                            <span>Peaks</span>
                        </NavLink>
                        <NavLink
                            to={'/login'}
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.navLink} ${s.active}`
                                    : `${s.navLink}`
                        }
                        >
                            <span>Planning</span>
                        </NavLink>
                        <NavLink
                            to={'/register'}
                            className={({ isActive }) =>
                                isActive
                                    ? `${s.navLink} ${s.active}`
                                    : `${s.navLink}`
                        }
                        >
                            <span>Trip Reports</span>
                        </NavLink>
                    </ul>
                </div>
            <div>
            { authService.name
                ? <DisplayUser />
                : <Link className={s.login} to="login">Login</Link>
            }
            </div>
        </div>
    </nav>
    )
}

export default Navbar;