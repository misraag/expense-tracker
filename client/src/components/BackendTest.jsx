import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';

function BackendTest() {
    const [message, setMessage] = useState("")

    useEffect(()=>{

        axios.get("http://localhost:5000/")
        .then((res)=>{
            console.log("Inside axios: response is : ", res.data)
            setMessage(res.data)
        })
        .catch((err)=> console.log("Error fetching API....:", err))

    },[]);



    return (
        <div>
            <h2>Testing backend</h2>
            <p>Backend Response: {message}</p>
        </div>
    );
}

export default BackendTest;