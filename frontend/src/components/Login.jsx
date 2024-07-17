import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const Login = () => {


    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
       
    }



    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/v1/login", user);

                 
            if(response && response.data.token){
                localStorage.setItem('auth' , JSON.stringify(response.data));
                navigate("/");
        
                console.log(response.data);
        
                setUser({
                    email: "",
                    password: ""
                });

            }


        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={inputHandler} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={inputHandler} type="password" className="form-control" name='password' id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

