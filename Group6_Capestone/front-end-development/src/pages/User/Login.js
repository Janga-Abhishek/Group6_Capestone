import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
import Menu from "../../components/Menu";
import "./UserStyles.css";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundImage: "url('/images/login_background.png')",
  backgroundSize: "cover",
  height: "100vh",
  width: "100%",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "3%",
  boxShadow: "22px 22px 5px rgba(0, 0, 0, 0.1)",
  border: "10px solid #1192DC",
  borderRadius: "60px",
  width: "350px",
  textAlign: "center",
  marginTop: "5%",
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
  backgroundColor: "#1192DC",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "3%",
  transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#0a71b5",
};

const linkStyle = {
  display: "block",
  marginTop: "10px",
  color: "#333",
  textDecoration: "none",
};

const logoStyle = {
  height: "120px",
  width: "auto",
  marginBottom: "20px",
  border: "1px solid black",
  borderRadius: "50%",
  animation: "rotateCoin 3s infinite",
};

const errorStyle = {
  color: "red",
  fontSize: "0.8em",
  float: "left",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    try {
      const { data } = await loginUser({
        variables: { username: username, password },
      });
      if (data && data.loginUser) {
        alert(`Logging in as user with username: ${username}`);
        window.location.href = "/userDashboard";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <Menu />
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleLogin}>
          <img src="/images/HealthEase_logo.png" alt="Logo" style={logoStyle} />
          <h2>User Login</h2>
          <div>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
            />
            {usernameError && <span style={errorStyle}>{usernameError}</span>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && <span style={errorStyle}>{passwordError}</span>}
          </div>
          <button
            type="submit"
            style={{ ...buttonStyle, ...(isButtonHovered && buttonHoverStyle) }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to="/register" style={linkStyle}>
            New user? Register here
          </Link>
          {error && <span style={errorStyle}>Error: {error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
