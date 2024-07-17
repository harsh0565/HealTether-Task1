import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
        // console.log(name);
        // console.log(value);
    }

    const submitForm = async (e) => {

        e.preventDefault();
        
        await axios.post("http://localhost:3000/api/v1/register", user).then((response) => {
            console.log(response);
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div>
            <form onSubmit={submitForm}>
            {/* <form > */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={inputHandler} type="text" className="form-control" name='name' id="name" />
                </div>
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

export default Register
