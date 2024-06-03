import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
import Menu from "../../components/Menu";
import "../../Stylesheet/UserStyles.css";
import "../../Stylesheet/Login_Register.css";

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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    setLoginError("");

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
        console.log(data);
        // Store the username in the session storage
        sessionStorage.setItem("username", username);
        window.location.href = "/userDashboard";
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div>
      <Menu />
      <div className="loginContainerStyle">
        <form className="formStyle" onSubmit={handleLogin}>
          <img
            src="/images/HealthEase_logo.png"
            alt="Logo"
            className="logoStyle"
          />
          <h2>User Login</h2>
          {loginError && <div className="alertStyle">{loginError}</div>}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="inputStyle"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
            />
            {usernameError && (
              <span className="errorStyle">{usernameError}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="inputStyle"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && (
              <span className="errorStyle">{passwordError}</span>
            )}
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
          <Link to="/register" className="linkStyle">
            New user? Register here
          </Link>
          {/* {error && <span className={errorStyle}>Error: {error.message}</span>} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
