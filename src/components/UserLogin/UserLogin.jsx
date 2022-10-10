import React, { useContext, useState } from "react";
import s from "./UserLogin.module.css";
import { 
    Link, 
    useNavigate,
    useLocation,
 } from "react-router-dom";
import { UserContext } from "../../App";
import { emailValidation } from "../../utilites/emailValidation";


const LoginUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authService, updateService } = useContext(UserContext);
    const [userLogins, setUserLogins] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChange = ({ target: { name, value }}) => {
        setUserLogins({ ...userLogins, [name]: value });
    }

    const loginUser = (e) => {
        e.preventDefault();
        const { email, password } = userLogins;

        if(!email) {
            setError(true);
            setErrorMsg('Please enter an email address');
           return
        }
        
        if(!emailValidation(email)) {
            setError(true);
            setErrorMsg('Please enter a valid email address');
           return
        }

        const { from } = location.state || { from: { pathname: '/' }};
        authService.loginUser(email, password).then(() => {
                updateService();
                navigate(from, { replace: true });
            }).catch(() => {
                setError(true);
                setUserLogins({ email: '', password: '' });
            });
    };

    return(
    <>
        <form 
            className={s.loginBody}
            onSubmit={loginUser}
        >
            <h3>Login</h3>
            <p>Enter your email and password</p>
            {error && <div style={{ color: 'red' }}>{errorMsg}</div>}
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
            No account? Create one <Link to='/register'>HERE</Link> 
            <br /> OR <br />
            <Link to='/'>Return Home</Link>
        </div>
    </>
    )
}

export default LoginUser;