import React, { Fragment, useState } from 'react';
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name] : e.target.value
        })
    };

    const onSumbitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {email, password};

            const response = await fetch("http://localhost:5000/auth/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseReq = await response.json();

            if(parseReq.token) {
                localStorage.setItem("token", parseReq.token);

                setAuth(true);

                toast.success("Loggedin Successfully")
            }else{
                setAuth(false);
                toast.error(parseReq);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center">Login</h1>
            <form onSubmit={onSumbitForm}>
                <input type="email" name="email" placeholder="Email" className="form-control m-3" value={email} onChange={ e => onChange(e)} />
                <input type="password" name="password" placeholder="Password" className="form-control m-3" value={password} onChange={ e => onChange(e)} />
                <button className="btn btn-success m-3" >Submit</button>
            </form>
            <Link to="/register" className="m-3">Register</Link>
        </Fragment>
    )
}

export default Login
