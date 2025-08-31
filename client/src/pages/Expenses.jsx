import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Expenses() {
  let [expenses, setExpenses] = useState([]);
  let [editingId, setEditingId] = useState(null);
  let [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
  });
  let [summary, setSummary] = useState({
    total: 0,
    thisMonth: 0,
    topCategory: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExpenses(res.data);
        calculateSummary(res.data);
      })
      .catch((err) => console.log(err.response?.data || err.message));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const updated = expenses.filter((exp) => exp._id !== id);
        setExpenses(updated);
        calculateSummary(updated);
      })
      .catch((err) => console.log(err.response?.data || err.message));
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setFormData({
      category: exp.category,
      description: exp.description,
      amount: exp.amount,
    });
  };

  const handleUpdate = (id) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/api/expenses/${id}`,
        { ...formData, amount: Number(formData.amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const updated = expenses.map((exp) =>
          exp._id === id ? res.data : exp
        );
        setExpenses(updated);
        calculateSummary(updated);
        setEditingId(null);
      })
      .catch((err) => console.log(err.response?.data || err.message));
  };

  // calculate summary cards
  const calculateSummary = (data) => {
    let total = data.reduce((sum, e) => sum + e.amount, 0);

    let currentMonth = new Date().getMonth();
    let thisMonth = data
      .filter((e) => new Date(e.date).getMonth() === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);

    let categoryTotals = {};
    data.forEach((e) => {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + e.amount;
    });

    let topCategory =
      Object.keys(categoryTotals).length > 0
        ? Object.keys(categoryTotals).reduce((a, b) =>
            categoryTotals[a] > categoryTotals[b] ? a : b
          )
        : "N/A";

    setSummary({ total, thisMonth, topCategory });
  };

  // group expenses by date
  const groupedExpenses = expenses.reduce((acc, exp) => {
    const date = new Date(exp.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(exp);
    return acc;
  }, {});

  // prepare data for PieChart (category wise total)
  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      if (!acc[exp.category])
        acc[exp.category] = { name: exp.category, value: 0 };
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  // prepare data for BarChart (date wise total)
  const dateData = Object.keys(groupedExpenses).map((date) => ({
    date,
    total: groupedExpenses[date].reduce(
      (sum, exp) => sum + exp.amount,
      0
    ),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9b59b6"];

  return (
    <div className="container mt-4">
      <h2>Your Expenses</h2>

      {/* Expenses List */}
      {Object.keys(groupedExpenses).length > 0 ? (
        Object.keys(groupedExpenses).map((date) => (
          <div key={date} className="mb-4">
            <h5 className="text-primary">{date}</h5>
            <ul className="list-group mt-2">
              {groupedExpenses[date].map((exp) => (
                <li
                  key={exp._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editingId === exp._id ? (
                    <div className="w-100">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amount: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdate(exp._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <strong>{exp.category}</strong>: {exp.description}
                      </div>
                      <div className="d-flex align-items-center">
                        <span
                          className="badge bg-success rounded-pill me-3 text-end"
                          style={{ width: "80px" }}
                        >
                          ₹{exp.amount}
                        </span>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(exp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(exp._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No expense added</p>
      )}

      {/* Summary Cards */}
      {expenses.length > 0 && (
        <div className="row text-center my-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>Total Expenses</h6>
                <h4 className="fw-bold">₹{summary.total}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>This Month</h6>
                <h4 className="fw-bold">₹{summary.thisMonth}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>Top Category</h6>
                <h4 className="fw-bold">{summary.topCategory}</h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {expenses.length > 0 && (
        <div className="mt-5">
          <h4 className="text-center mb-3">Expense Insights</h4>
          <div className="row">
            {/* Pie Chart */}
            <div className="col-md-6">
              <h6 className="text-center">Category-wise Distribution</h6>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="col-md-6">
              <h6 className="text-center">Date-wise Spending</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;
