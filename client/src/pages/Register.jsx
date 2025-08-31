import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {

    const [form, setForm] = useState({name:"", email:"", password:""})
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:5000/api/auth/register", form)
            setMsg(res.data.msg)
            navigate("/login")
        }catch(err) {
            setMsg(err.response.data.msg);
        }
    }


    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className="form-control my-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control my-2" onChange={handleChange} required />
        <button className="btn btn-primary w-100 mt-2" type="submit">Register</button>
      </form>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
    );
}

export default Register;