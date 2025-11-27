import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../Css/AdminSignup.css'
import { Link, useNavigate } from 'react-router-dom'

function AdminSignUp() {

  const navigate = useNavigate();

  const SECRET_KEY = "71107";  

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    passkey: ""
  });
  
  const addadmin = async () => {
    try {   
      if (signup.passkey !== SECRET_KEY) {
        alert("Invalid Secret Passkey");
        return;
      }

      const res = await axios.post(
        "http://localhost:9000/api/admin/signup",
        {
          name: signup.name,
          email: signup.email,
          password: signup.password,
        }
      );

      console.log("admin added:", res.data);
      alert("Signup successful");

      setSignup({ name: "", email: "", password: "", passkey: "" });

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

  
      navigate("/AdminProduct");

    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="signupContainer">

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

    
      <input
        className="signupInput"
        type="password"
        placeholder="Secret Passkey"
        value={signup.passkey}
        onChange={(e) => setSignup({ ...signup, passkey: e.target.value })}
      />

      <button className="signupButton" type="button" onClick={addadmin}>
        Sign Up
      </button>

      <div className="loginAsk">
        Already have an account?
        <Link to='/AdminLogin'>
          <span className="loginLink">Login</span>
        </Link>
      </div>

    </div>
  );
}

export default AdminSignUp;
