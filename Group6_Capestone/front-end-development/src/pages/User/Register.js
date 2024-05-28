import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import "./UserStyles.css";

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

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
  
};


const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundImage: "url('/images/login_background.png')",
  backgroundSize: "cover",
  height: "130vh",
  width: "100%",
};

const logoStyle = {
  height: "120px",
  width: "auto",
  marginBottom: "20px",
  border: "1px solid black",
  borderRadius: "50%",
  animation: "rotateCoin 3s infinite",
};


const handleRegistration = (e) =>{
  e.preventDefault();
  // Add validation and registration logic here
  console.log("form");
 // navigate("/login"); // Redirect to login page after successful registration
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

 return(
  <div>
    <Menu/>
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleRegistration}>
      <img src="/images/HealthEase_logo.png" alt="Logo" style={logoStyle} />
        <h2>USER REGISTRATION</h2>
        <input
            type="text"
            placeholder="First Name"
            style={inputStyle}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={inputStyle}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            style={inputStyle}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            style={inputStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Health Insurance Number"
            style={inputStyle}
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
