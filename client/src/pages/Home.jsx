import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    let [message, setMessage] = useState("")

    useEffect(()=> {
        axios.get("http://localhost:5000/")
        .then((res)=>{
            console.log(res.data)
             setMessage(res.data)
            })
        .catch((err)=> console.log(err))
    },[])


    return (
        <div className='text-center'>
            <h1 className='display-4'>Welcome to Expense Tracker</h1>
            <p className='lead mt-3'>Backend says: {message}</p>
        </div>
    );
}

export default Home;