import React, { useState } from "react";
import axios from "axios";
import "../Css/AdminSignup.css";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/user/login",
        login
      );

      alert("Login successful");

      // Store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");

      setLogin({ email: "", password: "" });

      navigate("/UserProduct");  // Go to product page
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signupContainer">

      <h2>User Login</h2>

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

      <button className="signupButton" onClick={handleLogin}>
        Login
      </button>

      <div className="loginAsk">
        Don’t have an account?
        <Link to="/UserSignup">
          <span className="loginLink"> Sign Up</span>
        </Link>
      </div>

    </div>
  );
}

export default UserLogin;
