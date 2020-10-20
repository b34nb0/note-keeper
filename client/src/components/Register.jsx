import React, { useState } from "react";
import Footer from "./Footer"
import HighlightIcon from '@material-ui/icons/Highlight';
import Axios from 'axios';

function Register() {

    // Check if user is already logged
    if(localStorage.getItem("user")) window.location.replace("/");

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        password_check: ""
    });

    const [errors, setErrors] = useState([]);

    function handleChange(event) {

        const {name, value} = event.target;
        setUser(prevUser => {
            return {
                ...prevUser,
                [name] : value
            }
        });  

    }

    function validateForm() {
        if(user.email.trim() === '' || user.username.trim() === '' || user.password.trim() === ''  ) {
            const message = "Please fill out all fields";
            setErrors(prevErrors => {
                return ([
                    ...prevErrors,
                    {message}
                ])
            });
            return false;
        } else {
            const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if(re.test(String(user.email).toLowerCase())) {
                return true; // Valid email and all fields have been filled out
            } else {
                const message = "Enter a valid email";
                setErrors(prevErrors => {
                    return ([
                        ...prevErrors,
                        {message}
                    ])
                });
                return false;
            }

        }
    }

    function checkPassword() {
        if(user.password !== user.password_check) {
            const message = "Passwords do not match";
            setErrors(prevErrors => {
                return ([
                    ...prevErrors,
                    {message}
                ])
            });
            return false; // Passwords do not match
        } else return true; // Passwords match
        
    }

    function registerUser(event) {
        event.preventDefault();
        setErrors([]);

        if(validateForm()) {
            if(checkPassword()) {
                Axios.post('/api/users', {
                    username : user.username,
                    email : user.email,
                    password : user.password
                    })
                    .then(res => {
                        //console.log(res.data);
                        if(res.status === 200) {
                            window.location.replace('/login');
                        }
                    })
                    .catch(err => {
                        console.log('Error: ' + err);
                    })

            }
        }

    }

    return (
        <div>
            <div className="login-page">
            <div className="login-form">
                <div className="form-header">
                    <h1>
                        <HighlightIcon />
                        Note Keeper
                    </h1>
                </div>
                
                <form onSubmit={registerUser}>
                    <input
                        value={user.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Email"></input> <br />
                    <input
                        value={user.username}
                        onChange={handleChange}
                        type="text" name="username"
                        placeholder="Username"></input> <br />
                    <input
                        value={user.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"></input> <br />
                    <input
                        value={user.password_check}
                        onChange={handleChange}
                        type="password"
                        name="password_check"
                        placeholder="Confirm your password"></input> <br />

                    {errors.map((error, index) => {
                        return (
                            <p className="error-message" key={index}>{error.message}</p>
                        );
                    })}

                    <input type="submit" value="Sign Up" onClick={registerUser}/>

                </form>
                <div className="form-footer">
                    <p><a href="/login">I already have an account</a></p>
                </div>
            </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default Register;