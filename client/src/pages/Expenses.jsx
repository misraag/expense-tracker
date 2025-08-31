import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Expenses() {
    let [expenses, setExpenses] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/api/expenses")
        .then((res)=> {
            console.log(res)
            setExpenses(res.data)
        })
        .catch((err)=> console.log(err))
    },[])


    return (
        <div>
            <h2 className='mb-4'>Your Expenses</h2>
            <ul className="list-group">
                {
                    expenses.map((exp)=>(
                        <li key={exp._id} className='list-group-item d-flex justify-content-between align-items-center'>
                            {exp.category}
                            <span className='badge bg-success rounded-pill'>₹{exp.amount}</span>
                        </li>
                    ))
                }
            </ul>
            
        </div>
    );
}

export default Expenses;