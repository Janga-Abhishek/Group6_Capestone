import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import emailjs from "emailjs-com";
import { LOGIN_USER } from "../../graphql/middleware";
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
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    try {
      console.log("Attempting to log in with:", { username, password });

      const { data } = await loginUser({
        variables: { username, password },
      });

      console.log("Login response:", data);

      if (data && data.loginUser) {
        const { email } = data.loginUser;
        console.log("User data:", data.loginUser);

        // Store the username in the session storage
        sessionStorage.setItem("username", username);

        // Get system info
        const systemInfo = getSystemInfo();

        // Send email notification
        sendEmailNotification(username, email, systemInfo)
          .then(() => {
            setEmailSent(true);
          })
          .catch((error) => {
            console.error("Failed to send email:", error);
            setLoginError("Failed to send email notification");
          });
      } else {
        setLoginError("Invalid credentials");
        console.log("No user data received from login mutation");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Invalid credentials");
    }
  };

  const getSystemInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const appName = navigator.appName;
    const appVersion = navigator.appVersion;

    console.log("User Agent:", userAgent);
    console.log("Platform:", platform);
    console.log("App Name:", appName);
    console.log("App Version:", appVersion);

    return { userAgent, platform, appName, appVersion };
  };

  const sendEmailNotification = (username, email, systemInfo) => {
    console.log("Sending email with the following details:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("System Info:", systemInfo);

    const message = `
      There has been a login activity detected for your account. \n\n
      System Info: \n
      User Agent: ${systemInfo.userAgent} \n
      Platform: ${systemInfo.platform} \n
      App Name: ${systemInfo.appName} \n
      App Version: ${systemInfo.appVersion} \n\n
    `;

    return new Promise((resolve, reject) => {
      emailjs
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
          console.log(
            "Email successfully sent!",
            response.status,
            response.text
          );
          resolve();
        })
        .catch((err) => {
          console.error("Failed to send email. Error: ", err);
          reject(err);
        });
    });
  };

  if (emailSent) {
    window.location.href = "/userDashboard";
  }

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
        </form>
      </div>
    </div>
  );
};

export default Login;
