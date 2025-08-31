import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Expenses() {
    let [expenses, setExpenses] = useState([])

    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.get("http://localhost:5000/api/expenses", {headers: {Authorization: `Bearer ${token}`}})
        .then((res)=> {
            console.log(res)
            setExpenses(res.data)
        })
        .catch((err)=> console.log(err.response.data))
    },[])


    return (
        <div className="container mt-4">
      <h2>Your Expenses</h2>
      <ul className="list-group mt-3">
        {expenses.map(exp => (
          <li key={exp._id} className="list-group-item d-flex justify-content-between align-items-center">
            {exp.category}: {exp.description}
            <span className="badge bg-success rounded-pill">₹{exp.amount}</span>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default Expenses;