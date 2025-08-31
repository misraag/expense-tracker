import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Expense Tracker</h1>
      <p className="lead">Track your daily expenses easily.</p>
      <div className="mt-4">
        <Link to="/register" className="btn btn-primary mx-2">Register</Link>
        <Link to="/login" className="btn btn-success mx-2">Login</Link>
      </div>
    </div>
  );
}

export default Home;
