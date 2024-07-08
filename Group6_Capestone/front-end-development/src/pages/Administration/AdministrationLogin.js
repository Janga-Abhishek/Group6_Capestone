import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import emailjs from "emailjs-com";
import { LOGIN_USER } from "../../graphql/middleware";
import Menu from "../../components/Menu";
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
  const [emailSent, setEmailSent] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedUserType = sessionStorage.getItem("userType");
    if (storedUsername && storedUserType) {
      if (storedUserType === "admin") {
        window.location.href = "/adminDashboard";
      } else if (storedUserType === "doctor") {
        window.location.href = "/doctorDashboard";
      }
    }
  }, []);

  const getSystemInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const appName = navigator.appName;
    const appVersion = navigator.appVersion;

    return { userAgent, platform, appName, appVersion };
  };

  const sendEmailNotification = (username, email, systemInfo) => {
    const message = `
      There has been a login activity detected for your account. \n\n
      System Info: \n
      User Agent: ${systemInfo.userAgent} \n
      Platform: ${systemInfo.platform} \n
      App Name: ${systemInfo.appName} \n
      App Version: ${systemInfo.appVersion} \n\n
    `;

    return emailjs
      .send(
        "gmail",
        "EmailNotification",
        {
          username,
          email,
          subject: "Login Activity Detected",
          message,
        },
        "RyutgiHxQkDT9ECdW"
      )
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
        setEmailSent(true);
      })
      .catch((err) => {
        console.error("Failed to send email. Error: ", err);
        setLoginError("Failed to send email notification");
      });
  };

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

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userType", user.userType);

        const systemInfo = getSystemInfo();
        sendEmailNotification(username, user.email, systemInfo);
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Invalid credentials");
    }
  };

  if (emailSent) {
    if (userType === "admin") {
      window.location.href = "/adminDashboard";
    } else if (userType === "doctor") {
      window.location.href = "/doctorDashboard";
    }
  }

  return (
    <div>
      {/* <Menu /> */}
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
