import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchTasks();

      setTitle("");
      setDescription("");

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1>Tasks</h1>

        <button
          className="btn btn-secondary"
          onClick={() => window.location.href='/dashboard'}
        >
          Dashboard
        </button>

      </div>

      <div className="card shadow p-4 mb-5 border-0">

        <h4 className="mb-3">Create Task</h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={createTask}
        >
          Create Task
        </button>

      </div>


      <div className="row">

        {
          tasks.map((task) => (

            <div className="col-md-6 mb-4" key={task._id}>

              <div className="card shadow border-0 h-100 p-3">

                <h4>{task.title}</h4>

                <p>{task.description}</p>

                <h6>
                  Status:
                  {' '}
                  <span className="badge bg-primary">
                    {task.status}
                  </span>
                </h6>

                <p className="mt-2">
                  Assigned To:
                  {' '}
                  {task.assignedTo?.name || 'Not Assigned'}
                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Tasks;