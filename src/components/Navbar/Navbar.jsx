import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import { UserContext } from "../../App";
import logo from "../../assets/logo.svg"
import DisplayUser from "../DisplayUser/DisplayUser";


const Navbar = () => {
    const { authService } = useContext(UserContext);
    const [isShown, setIsShown] = useState(false);

    const filterAscending = () => {
        console.log('filter tallest first');
    }

    const filterDescending = () => {
        console.log('filter smallest first');
    }

    return (
        <nav className={s.nav}>
            <div className={s.navbar}>
            <div className={s.logoContainer}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <ul className={s.navLinks}>
                <li 
                    className={`${s.navLink} ${s.peaks}`}
                    onMouseEnter={() => setIsShown(true)}
                    // onMouseLeave={() => setIsShown(false)}
                    
                >
                    Peaks
                    {isShown &&
                        <div
                            className={s.filter}
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                        >
                            <div className={s.filterRow}>
                                <i className="fa fa-caret-up"></i> 
                                <span onClick={filterAscending}>
                                    Sort Ascending
                                </span>
                            </div>
                            <div className={s.filterRow}>
                                <i className="fa fa-caret-down"></i> 
                                <span onClick={filterDescending}>
                                    Sort Descending
                                </span>
                            </div>
                        </div>
                    }
                </li>
                <li 
                    className={s.navLink}
                >
                    Planning
                </li>
                <li 
                    className={s.navLink}
                >
                    Ranges
                </li>
            </ul>
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