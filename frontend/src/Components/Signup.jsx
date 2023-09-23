import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'


const Signup = () => {
    let navigate = useNavigate()

    let name = useRef()
    let email = useRef()
    let password = useRef()

    useEffect(() => {
        if (localStorage.getItem("token") != null) {

            navigate("/");
        }
    })

    let handleSignup = (e) => {
        e.preventDefault()



        let data = JSON.stringify({
            name: name.current.value,
            email: email.current.value,
            password: password.current.value
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4200/api/bus/signup',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=67AA1C331E5507A16C0744FEC261739E'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data.message)
                navigate("/login")

            })
            .catch((error) => {
                console.log(error.response.data);
                alert(error.response.data.message)
            });

    }


    return (
        <div>
            <Navbar />
            <div className="mainbody">

                <div className="content">
                    <div className="text">
                        Signup Form
                    </div>
                    <form action="#">
                        <div className="field">
                            <input type="text" name='name' required ref={name} />
                            <span className="fas fa-user"></span>
                            <label>Name</label>
                        </div>
                        <div className="field">
                            <input type="text" name="email" required ref={email} />
                            <span className="fas fa-user"></span>
                            <label>Email</label>
                        </div>
                        <div class="field">
                            <input type="password" name='password' required ref={password} />
                            <span className="fas fa-lock"></span>
                            <label>Password</label>
                        </div>
                        <button onClick={handleSignup} >Sign Up</button>
                        <div className="sign-up">
                            Already have an Account?
                            <Link to="/login">Login now </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup