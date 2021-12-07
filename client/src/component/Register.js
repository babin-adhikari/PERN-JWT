import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;

    const onChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {email, password, name};

            const response = await fetch("http://localhost:5000/auth/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);

                setAuth(true);

                toast.success("Registered Successfully");
            }else{
                setAuth(false);

                toast.error(parseRes);
            }

            
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>

                <input type="email" name="email" placeholder="Email" className="form-control m-3" value={email} onChange={e => onChange(e)}/>

                <input type="password" name="password" placeholder="Password" className="form-control m-3" value={password} onChange={e => onChange(e)}/>

                <input type="text" name="name" placeholder="Name" className="form-control m-3" value={name} onChange={e => onChange(e)}/>

                <button className="btn btn-success btn-block m-3">Submit</button>
            </form>
            <Link to="/login" className="m-3">Login</Link>
        </Fragment>
    )
}

export default Register
