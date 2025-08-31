import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard({ user }) {
  const [summary, setSummary] = useState({
    total: 0,
    transactions: 0,
    biggest: 0,
    topCategory: "N/A",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const expenses = res.data;

      if (expenses.length === 0) {
        setSummary({
          total: 0,
          transactions: 0,
          biggest: 0,
          topCategory: "N/A",
        });
        return;
      }

      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      const biggest = Math.max(...expenses.map((e) => e.amount));

      let categoryTotals = {};
      expenses.forEach((e) => {
        categoryTotals[e.category] =
          (categoryTotals[e.category] || 0) + e.amount;
      });

      const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
        categoryTotals[a] > categoryTotals[b] ? a : b
      );

      setSummary({
        total,
        transactions: expenses.length,
        biggest,
        topCategory,
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Dashboard</h2>

      {/* Summary Cards */}
      <div className="row text-center mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Spent</h6>
              <h4 className="fw-bold text-primary">₹{summary.total}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Transactions</h6>
              <h4 className="fw-bold text-success">{summary.transactions}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Biggest Expense</h6>
              <h4 className="fw-bold text-danger">₹{summary.biggest}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Top Category</h6>
              <h4 className="fw-bold">{summary.topCategory}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/add-expense")}
        >
          ➕ Add Expense
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/expenses")}
        >
          📊 View Full Stats
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
