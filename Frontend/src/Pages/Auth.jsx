import React, { useState } from "react";

const Auth = () => {
  const [mode, setMode] = useState("signup"); 
  const [role, setRole] = useState("user");   

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passkey: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let url = "";
      let bodyData = {
        email: form.email,
        password: form.password,
      };

      if (mode === "signup") {
        bodyData.name = form.name;
      }

      
      if (role === "admin") {
        if (form.passkey !== "1234") {
          alert("Invalid secret passkey!");
          return;
        }

        if (mode === "signup") url = "http://localhost:9000/api/admin/signup";
        else url = "http://localhost:9000/api/admin/login";
      }

      
      if (role === "user") {
        if (mode === "signup") url = "http://localhost:9000/api/user/signup";
        else url = "http://localhost:9000/api/user/login";
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message || "Success!");
      if (data.token) localStorage.setItem("token", data.token);

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>

     
      <div style={styles.switch}>
        <button
          style={mode === "signup" ? styles.activeTop : styles.topBtn}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>

        <button
          style={mode === "login" ? styles.activeTop : styles.topBtn}
          onClick={() => setMode("login")}
        >
          Login
        </button>
      </div>

    
      <div style={styles.roleSelect}>
        <button
          style={role === "user" ? styles.activeBtn : styles.btn}
          onClick={() => setRole("user")}
        >
          User
        </button>

        <button
          style={role === "admin" ? styles.activeBtn : styles.btn}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
      </div>

      {/* Form Box */}
      <div style={styles.box}>
        <h2>{mode === "signup" ? "Signup" : "Login"}</h2>

        {mode === "signup" && (
          <input
            style={styles.input}
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />
        )}

        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        {/* Secret passkey for admin only */}
        {role === "admin" && (
          <input
            style={styles.input}
            name="passkey"
            placeholder="Enter Secret Passkey"
            onChange={handleChange}
          />
        )}

        <button style={styles.submitBtn} onClick={handleSubmit}>
          {mode === "signup" ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 },

  switch: { display: "flex", gap: 10, marginBottom: 20 },

  topBtn: {
    padding: "10px 20px",
    background: "#fff",
    border: "1px solid #444",
    borderRadius: 6,
  },
  activeTop: {
    padding: "10px 20px",
    background: "#303f9f",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: 6,
  },

  roleSelect: { display: "flex", gap: 10, marginBottom: 20 },

  btn: {
    padding: "10px 20px",
    border: "1px solid #555",
    background: "#fff",
    borderRadius: 6,
  },

  activeBtn: {
    padding: "10px 20px",
    border: "1px solid #555",
    background: "#4b70ff",
    color: "#fff",
    borderRadius: 6,
  },

  box: {
    width: 330,
    background: "#f2f2f2",
    padding: 25,
    borderRadius: 10,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    border: "1px solid #aaa",
  },

  submitBtn: {
    width: "100%",
    padding: 10,
    background: "#4b70ff",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
    border: "none",
  },
};
