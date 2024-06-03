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
  height: "150vh",
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

const errorStyle = {
  color: "red",
  fontSize: "0.8em",
  float: "left",
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

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [insuranceNumberError, setInsuranceNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");


  const validateForm = (e)=>{
    //empty checking
    if(!firstName){
      setFirstNameError("First Name is required!");
      
    }
    if(!lastName){
      setLastNameError("Last Name is required!");
      
    }
    if(!email){
      setEmailError("Email is required!");
      
    }
    if(!phoneNumber){
      setPasswordError("Phone Number is required!");
      
    }
    if(!password){
      setPasswordError("Password is required!");
      
    }
    if(!rePassword){
      setRePasswordError("Confirm Password is required!");
      
    }
    if(!address){
      setAddressError("Address is required!");
      
    }
    if(!insuranceNumber){
      setInsuranceNumberError("Health Insurance Number is required!");
      
    }

    //password strength & matching

    const validatePassword = (password) => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      return regex.test(password);
    };

    if (validatePassword(password)) {
      setPasswordError('');
    } else {
      setPasswordError('Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.');
    }

    if(password === rePassword){
      setRePasswordError("");
    }else{
      setRePasswordError("Password do not match !");
    }
    //validation for name
    const validateName = (name) => {
      const regex = /^[A-Za-z\s]{2,50}$/;
      return regex.test(name);
    };

    if (validateName(firstName)) {
      setFirstNameError('');
    } else {
      setFirstNameError('First Name must be 2-50 characters long and contain only letters and spaces.');
    }

    if (validateName(lastName)) {
      setLastNameError('');
    } else {
      setLastNameError('Last Name must be 2-50 characters long and contain only letters and spaces.');
    }

    //validation for email id

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if(validateEmail(email)){
      setEmailError("");
    }else{
      setEmailError("Invalid email address");
    }

    //validation for phone number

    const validatePhone = (phone) => {
      const regex = /^(\+1)?\d{10}$/;
      return regex.test(phone);
    };

    if(validatePhone(phoneNumber)){
      setPhoneNumberError("");
    }else{
      setPhoneNumberError("Invalid phone number !")
    }
  //validate health insuarance number

  const validateHealthCardNumber= (no)=>{
    const  regex = /^(?:\d{9}|\d{10}|[A-Z]\d{11})$/;
    return regex.test(no);
  }
  if (validateHealthCardNumber(insuranceNumber)){
    setInsuranceNumberError("");
  }else{
    setInsuranceNumberError("Invalid Insurance number !");

  }
  }

  const handleRegistration = async (e) =>{
    e.preventDefault();
    validateForm();
    console.log("form");
   // navigate("/login"); // Redirect to login page after successful registration
  };

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
            onChange={(e) => {
              setFirstName(e.target.value);
              setFirstNameError("");
            }}
          />
          <span style={errorStyle}>{firstNameError}</span>
          <input
            type="text"
            placeholder="Last Name"
            style={inputStyle}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setLastNameError("");
            }}
          />
          <span style={errorStyle}>{lastNameError}</span>
          <input
            type="text"
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          <span style={errorStyle}>{emailError}</span>
          <input
            type="text"
            placeholder="Phone Number"
            style={inputStyle}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setPhoneNumberError("");

            }}
          />
          <span style={errorStyle}>{phoneNumberError}</span>
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
          <span style={errorStyle}>{passwordError}</span>
          <input
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
              setRePasswordError("");

            }}
          />
          <span style={errorStyle}>{rePasswordError}</span>
          <input
            type="text"
            placeholder="Address"
            style={inputStyle}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setAddressError("");
            }}
          />
          <span style={errorStyle}>{addressError}</span>
          <input
            type="text"
            placeholder="Health Insurance Number"
            style={inputStyle}
            value={insuranceNumber}
            onChange={(e) => {
              setInsuranceNumber(e.target.value);
              setInsuranceNumberError("");
            }}
          />
          <span style={errorStyle}>{insuranceNumberError}</span>

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
