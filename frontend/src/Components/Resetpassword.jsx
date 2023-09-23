import React, { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"

const Resetpassword = () => {
    let navigate = useNavigate()

    let email = useRef()
    let password = useRef()

    let resetPassword = () => {



        let data = JSON.stringify({
            email: email.current.value,
            password: password.current.value
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:4200/api/bus/resetpass',
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
        <div className="mainbody">

            <div className="content">
                <div className="text">
                    Resetpassword
                </div>
                <form action="#">
                    <div className="field">
                        <input type="text" required ref={email} />
                        <span className="fas fa-user"></span>
                        <label>Email</label>
                    </div>
                    <div class="field">
                        <input type="password" required ref={password} />
                        <span className="fas fa-lock"></span>
                        <label>Password</label>
                    </div>
                    <div className="forgot-pass">
                        <Link to="/login">Back to Login</Link>
                    </div>
                    <button onClick={resetPassword} >Reset Password</button>
                    {/* <div className="sign-up">
               Not a member?
               <Link to="/signup" ></Link>
               </div> */}
                </form>
            </div>

        </div>
    )
}

export default Resetpassword