import React, { useContext, useState } from "react";
import s from "./UserRegister.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { isEmailValid } from "../../utilities/isEmailValid";
import InputBase from "../InputBase/InputBase";

const UserRegister = () => {
  const { authService, updateAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const INIT_STATE = {
    name: "",
    email: "",
    password: "",
  };
  const INIT_ERROR = {
    email: false,
    password: false,
  };
  const [userInfoError, setUserInfoError] = useState(INIT_ERROR);
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [showError, setShowError] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const validateInputs = (name, value) => {
    console.log("validate", name, value);
    if (!value) {
      console.log("error", name);
      setUserInfoError({ ...userInfoError, [`${name}`]: true });
      return;
    }
  };

  const onBlur = () => {
    Object.keys(userInfo).forEach((name) => {
      validateInputs(name, userInfo[name]);

      // if (!userInfo[key].length) {
      //   console.log("empty", userInfoError[key]);
      //   setUserInfoError({ ...userInfoError, [key]: true });
      //   console.log("empty!", userInfoError);
      //   return;
      // }
      // console.log("each key", key);
      // console.log("each val", userInfo[key]);
    });
    console.log(userInfoError);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit", userInfoError);
    const { name, email, password } = userInfo;
    // if (!name || !email || !password) {
    //   Object.keys(userInfo).forEach((key) => {
    //     if (userInfo[key].length === 0) {
    //       let errorMsg = `Please enter a valid ${key}`;
    //       setError(true);
    //       setErrorMsg(errorMsg);
    //     }
    //   });
    // } else {
    //   authService
    //     .createUser(name, email, password)
    //     .then(() => {
    //       updateAuth();
    //       navigate("/");
    //     })
    //     .catch(() => {
    //       setError(true);
    //       setUserInfo({
    //         name: "",
    //         email: "",
    //         password: "",
    //       });
    //     });
    // }
  };

  const inputData = [
    { key: 1, name: "name", errorMsg: "" },
    { key: 2, name: "email", errorMsg: "Please enter a valid email" },
    { key: 3, name: "password", errorMsg: "Please enter a valid password" },
    // {key: 4, name: "confirm password", errorMsg: 'Passwords do not match'},
  ];

  return (
    <>
      <form className={s.registerBody} onSubmit={onSubmit} onBlur={onBlur}>
        <h3>Create Account</h3>
        <p>Enter your email and password</p>
        {/* {error && <div className={s.errorMsg}>{errorMsg}</div>} */}
        {inputData.map((data) => (
          <InputBase
            key={data.key}
            data={data}
            onChange={onChange}
            error={userInfo[data.name]}
            showError={showError}
          />
        ))}
        {/* <input
          className={s.inputBase}
          name="name"
          type="text"
          placeholder="name"
          autoComplete="off"
          onChange={onChange}
        />
        <input
          className={s.inputBase}
          name="email"
          type="text"
          placeholder="Email"
          autoComplete="off"
          onChange={onChange}
        />
        <input
          className={s.inputBase}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          onChange={onChange}
        /> */}
        <input className={s.submitBtn} type="submit" value="Login" />
      </form>
      <div className={s.linkContainer}>
        Already have an account?
        <div className={s.links}>
          <Link to="/login">Login</Link>
          <div className={s.lineContainer}>
            <hr className={s.line} /> <span>OR</span> <hr className={s.line} />
          </div>
          <Link to="/">Return Home</Link>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
