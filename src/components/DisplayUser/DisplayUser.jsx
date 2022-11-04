import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import s from "./DisplayUser.module.css";
import { Link } from "react-router-dom";

const DisplayUser = () => {
  const { authService } = useContext(UserContext);
  const [showLinks, setShowLinks] = useState(false);

  const capitalizeName = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={s.userContainer}>
      <div className={s.user}>
        <div className={s.name}>
          <h5 className={s.username}>Hi, {capitalizeName(authService.name)}</h5>
          <button onClick={() => setShowLinks(!showLinks)} className={s.arrow}>
            {!showLinks ? (
              <i className="fa fa-caret-down"></i>
            ) : (
              <i className="fa fa-caret-up"></i>
            )}
          </button>
        </div>
        {showLinks && (
          <div className={s.userLinks}>
            <Link className={s.dropdown} to="edit">
              Edit
            </Link>
            <Link className={s.dropdown} to="logout">
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayUser;
