import React, { useState } from "react";
import axios from "axios";

function AddExpense({ user }) {
  const [form, setForm] = useState({
    category: "",
    description: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/expenses",
        { ...form, userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Expense added:..", res.data);
      alert("Expense added successfully...");
      setForm({ category: "", description: "", amount: "" });
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Amount"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
