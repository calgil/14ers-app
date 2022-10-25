import React, { useContext, useState } from "react";
import s from "./UserRegister.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { isEmailValid } from "../../utilities/isEmailValid";
import { isPasswordValid } from "../../utilities/isPasswordValid";
import { doPasswordsMatch } from "../../utilities/doPasswordsMatch";
import InputBase from "../InputBase/InputBase";
import BackBtn from "../BackBtn/BackBtn";

const UserRegister = () => {
  const { authService, updateAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const INIT_STATE = {
    name: "",
    email: "",
    password: "",
  };

  const INIT_ERROR = {
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  };

  const [error, setError] = useState(INIT_ERROR);
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [showInputError, setShowInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    if (name === "name") {
      if (!value.length) {
        setError({ ...error, name: true });
        return;
      }
      setError({ ...error, name: false });
      setUserInfo({ ...userInfo, name: value });
    }
    if (name === "email") {
      if (!isEmailValid(value)) {
        setError({ ...error, email: true });
        return;
      }
      setError({ ...error, email: false });
      setUserInfo({ ...userInfo, email: value });
    }
    if (name === "password") {
      if (!isPasswordValid(value)) {
        setError({ ...error, password: true });
        return;
      }
      setError({ ...error, password: false });
      setUserInfo({ ...userInfo, password: value });
    }
    if (name === "confirmPassword") {
      if (!userInfo.password.length) {
        console.log("no password");
        return;
      }
      if (error.password) {
        console.log("invalid password");
        return;
      }
      if (!doPasswordsMatch(userInfo.password, value)) {
        setError({ ...error, confirmPassword: true });
        return;
      }
      setError({ ...error, confirmPassword: false });
    }
  };

  const checkLoginData = () => {
    let isValid = true;
    Object.values(userInfo).forEach((val) => {
      if (!val.length) {
        isValid = false;
        return;
      }
    });
    return isValid;
  };

  const createUser = (e) => {
    e.preventDefault();
    setShowInputError(true);

    if (!checkLoginData()) {
      return;
    }

    if (error.name || error.email || error.password || error.confirmPassword) {
      return;
    }

    const { name, email, password } = userInfo;

    authService
      .createUser(name, email, password)
      .then((res) => {
        if (res.status === 400) {
          setShowErrorMsg(true);
          setErrorMsg("There is already a user with that email");
          return;
        }
        if (res.status !== 200) {
          setErrorMsg("Something went wrong");
          setShowErrorMsg(true);
          return;
        }
        if (res.status === 200) {
          updateAuth();
          navigate("/");
        }
      })
      .catch(() => {
        setError(true);
        setUserInfo({
          name: "",
          email: "",
          password: "",
        });
      });
  };

  const inputData = [
    { key: 1, name: "name", type: "text", errorMsg: "Please enter a name" },
    {
      key: 2,
      name: "email",
      type: "email",
      errorMsg: "Please enter valid email",
    },
    {
      key: 3,
      name: "password",
      type: "password",
      errorMsg: "Please enter valid password",
    },
    {
      key: 4,
      name: "confirmPassword",
      type: "password",
      errorMsg: "Passwords don't match",
    },
  ];

  return (
    <>
      <form className={s.registerBody} onSubmit={createUser}>
        <h3>Create Account</h3>
        <p>Enter your email and password</p>
        {showErrorMsg && <div className={s.errorMsg}>{errorMsg}</div>}
        {inputData.map((data) => (
          <InputBase
            key={data.key}
            data={data}
            onChange={onChange}
            error={error[data.name]}
            showError={showInputError}
          />
        ))}
        <input className={s.submitBtn} type="submit" value="Login" />
      </form>
      <div className={s.links}>
        Already have an account? <Link to="/login">Login</Link>
        <div className={s.lineContainer}>
          <hr className={s.line} /> <span>OR</span> <hr className={s.line} />
        </div>
        <Link to="/">Return Home</Link>
      </div>
      <BackBtn />
    </>
  );
};

export default UserRegister;
