import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
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

const handleRegistration = (e) => {
  e.preventDefault();

  console.log("form");
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div>
      <Menu />
      <div className="registerContainerStyle">
        <form className="formStyle" onSubmit={handleRegistration}>
          <img
            src="/images/HealthEase_logo.png"
            alt="Logo"
            className="logoStyle"
          />
          <h2>USER REGISTRATION</h2>
          <input
            type="text"
            placeholder="First Name"
            className="inputStyle"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="inputStyle"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="inputStyle"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="inputStyle"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputStyle"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="inputStyle"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="inputStyle"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Health Insurance Number"
            className="inputStyle"
            value={insuranceNumber}
            onChange={(e) => setInsuranceNumber(e.target.value)}
          />
          <button
            type="submit"
            style={{ ...buttonStyle, ...(isButtonHovered && buttonHoverStyle) }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;