import React, { useState } from "react";
import { Link } from "react-router-dom";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  width: "300px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const linkStyle = {
  display: "block",
  marginTop: "10px",
  color: "#333",
  textDecoration: "none",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    alert(`Logging in as user with username: ${username}`);
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleLogin}>
        <h2>User Login</h2>
        <input
          type="text"
          placeholder="Username"
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
        <Link to="/register" style={linkStyle}>
          New user? Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;
