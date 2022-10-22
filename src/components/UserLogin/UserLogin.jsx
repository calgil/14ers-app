import React, { useContext, useState } from "react";
import s from "./UserLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { isEmailValid } from "../../utilities/isEmailValid";
import { isPasswordValid } from "../../utilities/isPasswordValid";
import InputBase from "../InputBase/InputBase";

const UserLogin = () => {
  const INIT_LOGIN = {
    email: "",
    password: "",
  };
  const INIT_ERROR = {
    email: false,
    password: false,
  };
  const navigate = useNavigate();
  const { authService, updateAuth } = useContext(UserContext);
  const [userLogins, setUserLogins] = useState(INIT_LOGIN);
  const [loginError, setLoginError] = useState(INIT_ERROR);
  const [showInputError, setShowInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    if (name === "email") {
      if (!isEmailValid(value)) {
        return setLoginError({ ...loginError, [name]: false });
      }
      setLoginError({ ...loginError, [name]: true });
    }
    if (name === "password") {
      if (!isPasswordValid(value)) {
        return setLoginError({ ...loginError, [name]: false });
      }
      setLoginError({ ...loginError, [name]: true });
    }
    setUserLogins({ ...userLogins, [name]: value });
  };

  const checkLoginData = () => {
    Object.keys(userLogins).forEach((key) => {
      if (!userLogins[key].length === 0) {
        setLoginError({ ...loginError, [`${key}`]: false });
      }
    });
  };

  const handleBlur = () => {
    checkLoginData();
  };

  const loginUser = (e) => {
    e.preventDefault();
    checkLoginData();
    setShowInputError(true);
    const { email, password } = userLogins;

    if (!email.length || !password.length) {
      return;
    }

    if (!loginError.email || !loginError.password) {
      return;
    }

    authService
      .loginUser(email, password)
      .then((res) => {
        if (res.status === 401) {
          setShowErrorMsg(true);
          setErrorMsg("Invalid username or password. Please try again");
          return;
        }
        if (res.status !== 200) {
          setShowErrorMsg(true);
          setErrorMsg("Something went wrong. Please try again");
          return;
        }
        if (res.status === 200) {
          updateAuth();
          navigate(-1);
          setLoginError(INIT_ERROR);
        }
      })
      .catch(() => {
        setUserLogins({ email: "", password: "" });
      });
  };

  const inputData = [
    { key: 1, name: "email", errorMsg: "Please enter a valid email" },
    { key: 2, name: "password", errorMsg: "Please enter a valid password" },
  ];

  return (
    <>
      <form className={s.loginBody} onBlur={handleBlur} onSubmit={loginUser}>
        <h3 className={s.header}>Welcome Back!</h3>
        <p className={s.instructions}>Enter your email and password</p>
        {showErrorMsg && <div className={s.errorMsg}>{errorMsg}</div>}
        {inputData.map((data) => (
          <InputBase
            key={data.key}
            data={data}
            onChange={onChange}
            error={!loginError[data.name]}
            showError={showInputError}
          />
        ))}
        <input className={s.submitBtn} type="submit" value="Login" />
      </form>

      <div className={s.links}>
        No account? <Link to="/register">Create one</Link>
        <div className={s.lineContainer}>
          <hr className={s.line} /> <span>OR</span> <hr className={s.line} />
        </div>
        <div>
          <Link to="/">Home</Link>
          <button className={s.backBtn} onClick={() => navigate(-1)}>
            <i className="fa fa-chevron-left"></i>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
