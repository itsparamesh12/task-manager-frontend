import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setData(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1>Dashboard</h1>

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

      </div>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0 p-3 text-center">
            <h5>Total Tasks</h5>
            <h2>{data.totalTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-3 text-center">
            <h5>Completed</h5>
            <h2>{data.completedTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-3 text-center">
            <h5>Pending</h5>
            <h2>{data.pendingTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-3 text-center">
            <h5>Overdue</h5>
            <h2>{data.overdueTasks}</h2>
          </div>
        </div>

      </div>

      <div className="mt-5">

        <button
          className="btn btn-primary"
          onClick={() => window.location.href='/tasks'}
        >
          View Tasks
        </button>

      </div>

    </div>
  );
}

export default Dashboard;