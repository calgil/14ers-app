import React, { useContext, useState } from "react";
import s from "./UserLogin.module.css";
import { 
    Link, 
    useNavigate,
 } from "react-router-dom";
import { UserContext } from "../../App";
import { emailValidation } from "../../utilities/emailValidation";


const UserLogin = () => {
    const navigate = useNavigate();
    const { authService, updateAuth } = useContext(UserContext);
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

        authService.loginUser(email, password).then(() => {
                updateAuth();
                navigate(-1);
                // navigate('/');
            }).catch(() => {
                setError(true);
                setUserLogins({ email: '', password: '' });
            });
    };

    return (
    <>
        <form 
            className={s.loginBody}
            onSubmit={loginUser}
        >
            <h3>Login</h3>
            <p>Enter your email and password</p>
            {error && <div className={s.errorMsg}>{errorMsg}</div>}
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
        <div className={s.linkContainer}>
            No account? 
                <div className={s.links}>
                    <Link to='/register'>Create one</Link> 
                    <div className={s.lineContainer}> 
                        <hr className={s.line} /> <span>OR</span> <hr className={s.line} />
                    </div> 
                    <div className={s.goBack}>
                        <Link to='/'>Home</Link>
                        <button onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
        </div>
    </>
    )
}

export default UserLogin;