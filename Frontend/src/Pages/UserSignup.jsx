import  { useState } from "react";
import axios from "axios";
import "../Css/AdminSignup.css";
import { Link, useNavigate } from "react-router-dom";

function UserSignup() {
  const navigate = useNavigate();

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/user/signup",
        signup
      );

      alert("Signup successful");

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");

      setSignup({ name: "", email: "", password: "" });

      navigate("/UserProduct");     
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signupContainer">

      <h2>User Signup</h2>

      <input
        className="signupInput"
        type="text"
        placeholder="Name"
        value={signup.name}
        onChange={(e) => setSignup({ ...signup, name: e.target.value })}
      />

      <input
        className="signupInput"
        type="email"
        placeholder="Email"
        value={signup.email}
        onChange={(e) => setSignup({ ...signup, email: e.target.value })}
      />

      <input
        className="signupInput"
        type="password"
        placeholder="Password"
        value={signup.password}
        onChange={(e) => setSignup({ ...signup, password: e.target.value })}
      />

      <button className="signupButton" onClick={handleSignup}>
        Sign Up
      </button>

      <div className="loginAsk">
        Already have an account?
        <Link to="/UserLogin">
          <span className="loginLink"> Login</span>
        </Link>
      </div>

    </div>
  );
}

export default UserSignup;
