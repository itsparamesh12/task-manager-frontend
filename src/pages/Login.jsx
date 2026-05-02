import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (error) {

      alert("Invalid Credentials");

    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: '#f4f7fb' }}
    >

      <div
        className="card shadow p-4"
        style={{ width: '400px', borderRadius: '15px' }}
      >

        <h2 className="text-center mb-4">
          Team Task Manager
        </h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;