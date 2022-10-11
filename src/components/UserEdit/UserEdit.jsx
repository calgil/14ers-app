import React, { useState, useContext } from "react";
import s from "./UserEdit.module.css";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import { emailValidation } from "../../utilites/emailValidation";
import { UserContext } from "../../App";

const UserEdit = () => {
    // const { authService, updateAuth } = useContext(UserContext);
    // const INIT_USER_DATA = {
    //     name: authService.name,
    //     email:authService.email
    // }
    const navigate = useNavigate();
    const { authService, updateAuth } = useContext(UserContext);
    const [newUserInfo, setNewUserInfo] = useState({});
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChange = ({ target: { name, value }}) => {
        if (name === 'email') {
            const validEmail = emailValidation(value);
            if(!validEmail){
                setError(true);
                setErrorMsg('Please enter a valid email address');
                setNewUserInfo({ ...newUserInfo, email: '' });
            }
            if(validEmail) {
                setNewUserInfo({ ...newUserInfo, [name]: value.toLowerCase() });
            }
        };
        if (name !== 'email') {
            setNewUserInfo({ ...newUserInfo, [name]: value });
        }
    };

    const editUser = (e) => {
        e.preventDefault();
        authService.editUser(newUserInfo).then(() => {
            updateAuth();
            navigate("/");
        })
        .catch((error) => {
            throw error;
        })
    }

    return (
        <>
        <form 
            className={s.editBody}
            onSubmit={editUser}
        >
            <h3>Edit Your Info</h3>
            <p></p>
            {error && <div style={{ color: 'red' }}>{errorMsg}</div>}
                <input 
                    className={s.inputBase} 
                    name="name" 
                    type="text" 
                    placeholder='new name'
                    autoComplete="off"
                    onChange={onChange}
                />
                <input 
                    className={s.inputBase} 
                    name="email" 
                    type="text" 
                    placeholder='new email'
                    autoComplete="off"
                    onChange={onChange}
                />
                {/* not certain how to change password... */}
                {/* <input 
                    className={s.inputBase} 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    autoComplete="off"
                    onChange={onChange}
                /> */}
            <input 
                className={s.submitBtn} 
                type="submit" 
                value="Update" 
            />
        </form>
        <div className={s.link}>
            <Link to='/login'>Login here</Link> 
            <br /> OR <br />
            <Link to='/'>Return Home</Link>
        </div>
    </>
    );
};

export default UserEdit;