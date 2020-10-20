import React, { useState } from "react";
import Footer from "./Footer";
import HighlightIcon from '@material-ui/icons/Highlight';
import Axios from 'axios';

function Login() {

    // Check if user is already logged
    if(localStorage.getItem("user")) window.location.replace("/");


    const [user, setUser] = useState({
        username: "",
        password: ""
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
        if(user.username.trim() === '' || user.password.trim() === ''  ) {
            const message = "Please fill out all fields";
            setErrors(prevErrors => {
                return ([
                    ...prevErrors,
                    {message}
                ])
            });
            return false;
        } else {

            return true;

        }
    }

    function loginUser(event) {
        event.preventDefault();
        setErrors([]);
        if(validateForm()) {
            
            //Auhtenticate user
            Axios.post('/api/users/login', {...user})
                .then(res => {
                    if(res.status === 200) {
                        //console.log(res);
                        localStorage.setItem("user", JSON.stringify(res.data));
                        window.location.replace('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                    const message = "User/password not valid";
                        setErrors(prevErrors => {
                            return ([
                                ...prevErrors,
                                {message}
                            ])
                        });
                });

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
                <form onSubmit={loginUser}>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="username"
                        placeholder="Username"></input> <br />
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"></input> <br />
                    {errors.map((error, index) => {
                        return (
                            <p className="error-message" key={index}>{error.message}</p>
                        );
                    })}

                    <input
                        onClick={loginUser}
                        type="submit"
                        value="Log In"/>
                </form>
                <div className="form-footer">
                    <p>Don't have an account? <br />
                    Create one <a href="/register">here</a></p>
                </div>
            </div>
            </div>
            <Footer />

        </div>
        
    );
}

export default Login;