import React, { useState } from "react";

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

const dropdownStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const AdministrationLogin = () => {
  const [userType, setUserType] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    alert(`Logging in as ${userType} with username: ${username}`);
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <lable>Login as</lable>
        <select
          style={dropdownStyle}
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdministrationLogin;
