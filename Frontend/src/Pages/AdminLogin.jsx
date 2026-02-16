import React, { useState } from 'react';
import axios from 'axios';
import '../Css/AdminSignup.css';  
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:9000/api/admin/login", login);

      console.log("Login successful:", res.data);
      alert("Login Successful");

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      
      navigate("/AdminProduct");

      
      setLogin({ email: "", password: "" });

    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signupContainer">

      <h2>Admin Login</h2>

      <input
        className="signupInput"
        type="email"
        placeholder="Email"
        value={login.email}
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />

      <input
        className="signupInput"
        type="password"
        placeholder="Password"
        value={login.password}
        onChange={(e) => setLogin({ ...login, password: e.target.value })}
      />

      <button className="signupButton" type="button" onClick={handleLogin}>
        Login
      </button>

      <div className="loginAsk">
        Don’t have an account?  
        <Link to="/AdminSignUp">
          <span className="loginLink"> Sign Up</span>
        </Link>
      </div>

    </div>
  );
}

export default AdminLogin;
