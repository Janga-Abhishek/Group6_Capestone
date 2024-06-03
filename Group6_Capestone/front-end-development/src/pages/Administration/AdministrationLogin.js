import React, { useState } from "react";
import Menu from "../../components/Menu";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
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

const dropdownStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  margin: "3%",
};

const AdministrationLogin = () => {
  const [userType, setUserType] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setLoginError("");

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
        variables: { username, password, userType },
      });

      if (data && data.loginUser) {
        const user = data.loginUser;
        if (user.userType !== userType) {
          setLoginError("User type doesn't match");
          return;
        }

        if (userType === "admin") {
          window.location.href = "/adminDashboard";
        } else if (userType === "doctor") {
          window.location.href = "/doctorDashboard";
        }
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
      <div className="AdministrationContainerStyle">
        <form className="formStyle" onSubmit={handleLogin}>
          <img
            src="/images/HealthEase_logo.png"
            alt="Logo"
            className="logoStyle"
          />
          <h2>Login</h2>
          {loginError && <div className="alertStyle">{loginError}</div>}
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
          {usernameError && <span className="errorStyle">{usernameError}</span>}
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
          {passwordError && <span className="errorStyle">{passwordError}</span>}
          <br />
          <label style={{ float: "left" }}>Login as</label>
          <select
            style={dropdownStyle}
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
          </select>
          <button
            type="submit"
            style={{ ...buttonStyle, ...(isButtonHovered && buttonHoverStyle) }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdministrationLogin;
