import React, { useContext, useState } from "react";
import s from "./UserRegister.module.css";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import { UserContext } from "../../App";


const RegisterUser = () => {
    const { authService, updateService } = useContext(UserContext);
    const navigate = useNavigate();

    const INIT_STATE = {
        name: '',
        email: '',
        password: '',
    };
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [userInfo, setUserInfo] = useState(INIT_STATE);

    const onChange = ({ target: { name, value }}) => {
        // I eventually want to run error handling on email here
        // if (name === 'email') {
        //     emailValidation();
        // }
        setUserInfo({ ...userInfo, [name]: value });
    };

    const createUser = (e) => {
        e.preventDefault();
        const { name, email, password } = userInfo;
        if (!name || !email || !password) {
            console.log('error validation');
            Object.keys(userInfo).map((key) => {
                if (userInfo[key].length === 0) {
                    let errorMsg = `Please enter a valid ${key}`;
                    setError(true);
                    setErrorMsg(errorMsg);
                };
            });
        } else {
            authService.createUser(name, email, password)
            .then(() => {
                updateService();
                navigate("/");
            })
            .catch(() => {
                setError(true);
                setUserInfo({
                    name: '',
                    email: '',
                    password: '',
                });
            });
        };
    };

    return (
        <>
        <form 
            className={s.registerBody}
            onSubmit={createUser}
        >
            <h3>Create Account</h3>
            <p>Enter your email and password</p>
            {error && <div>{errorMsg}</div>}
                <input 
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
                />
            <input 
                className={s.submitBtn} 
                type="submit" 
                value="Login" 
            />
        </form>
        <div className={s.link}>
            Already have an account? Login <Link to='/login'>HERE</Link> 
            <br /> OR <br />
            <Link to='/'>Return Home</Link>
        </div>
    </>
    );
};

export default RegisterUser;