import React, { useContext, useState } from "react";
import s from "./UserLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { emailValidation } from "../../utilities/emailValidation";

const UserLogin = () => {
  const INIT_ERROR = {
    email: " ",
    password: " ",
  };
  const navigate = useNavigate();
  const { authService, updateAuth } = useContext(UserContext);
  const [userLogins, setUserLogins] = useState({ email: "", password: "" });
  const [error, setError] = useState(INIT_ERROR);
  const [showError, setShowError] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    if (name === "email") {
      if (!value.length) {
        setError({ ...error, [name]: "Please provide email" });
        return;
      }
      if (!emailValidation(value)) {
        setError({ ...error, [name]: "Please provide valid email" });
        return;
      }
    }

    if (name === "password") {
      if (!value.length) {
        setError({ ...error, [name]: "Please enter a password" });
      }
    }
    setError({ ...error, [name]: undefined });
    setUserLogins({ ...userLogins, [name]: value });
  };

  const handleBlur = () => {
    Object.keys(error).forEach((key) => {
      if (error[key] !== undefined) {
        setShowError(true);
        return;
      }
    });
    // console.log('blur error', error);
  };

  const loginUser = (e) => {
    e.preventDefault();
    const { email, password } = userLogins;

    if (!!error.email || !!error.password) {
      console.log("error found");
      return;
    }

    console.log("gonna send this", email, password);

    // authService.loginUser(email, password).then(() => {
    //         updateAuth();
    //         navigate(-1);
    //         // navigate('/');
    //     }).catch(() => {
    //         setError(true);
    //         setUserLogins({ email: '', password: '' });
    //     });
  };

  return (
    <>
      <form className={s.loginBody} onBlur={handleBlur} onSubmit={loginUser}>
        <h3>Login</h3>
        <p>Enter your email and password</p>
        {showError && !!error["email"] && (
          <div className={s.errorMsg}>{error["email"]}</div>
        )}
        <input
          className={s.inputBase}
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={onChange}
        />
        {
          showError && !!error["password"] && (
            <div className={s.errorMsg}>Please enter a password</div>
          )
          // later add error handling to password
        }
        <input
          className={s.inputBase}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          onChange={onChange}
        />
        <input className={s.submitBtn} type="submit" value="Login" />
      </form>
      <div className={s.linkContainer}>
        No account?
        <div className={s.links}>
          <Link to="/register">Create one</Link>
          <div className={s.lineContainer}>
            <hr className={s.line} /> <span>OR</span> <hr className={s.line} />
          </div>
          <div>
            <Link to="/">Home</Link>
            <button className={s.backBtn} onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
