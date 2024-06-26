import React, { useState } from "react";
import Menu from "../../components/Menu";
import "../../Stylesheet/Login_Register.css";
import { useMutation,useLazyQuery } from "@apollo/client";
import { REGISTER_USER,CHECK_USERNAME,CHECK_EMAIL} from "../../graphql/middleware";
import emailjs from "@emailjs/browser";

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

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [insuranceNumberError, setInsuranceNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [registrationUpdate, setRegistrationUpdate] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);
  const [checkUsername] = useLazyQuery(CHECK_USERNAME);
  const [checkEmail] = useLazyQuery(CHECK_EMAIL);

  const sendEmail = (firstName, email) => {
    const templateParams = {
      to_name: firstName,
      to_email: email,
      from_name: "HealthEase",
      from_email: "healthease324@gmail.com",
      subject: "Registration successful for HealthEase",
      message: "You have registered successfully"
    };

    emailjs.send('service_op5arxo', 'template_8sx8s2a', templateParams, 'XhXkvNj6XjZCkddgl')
      .then((result) => {
          console.log("Email sent successfully", result.text);
          setRegistrationUpdate("Registration is successful. Please check your email.");
      }, (error) => {
          console.log("Error sending email:", error.text);
      });
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!( await validateForm())) {
      return;
    }


    try {
      const { data } = await registerUser({
        variables: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phonenumber: phoneNumber,
          address: address,
          insuranceNumber: insuranceNumber,
          username: username,
          password: password,
          userType: "patient",
        },
      });

      
      sendEmail(firstName,email);
      console.log("User registered successfully:", data);

      setRegistrationUpdate("Registration is Successful");
      window.location.href = "/Login";
      
    } catch (error) {
      console.error("Error Registering User:", error);
    }
  };

  const validateForm = async() => {
    // validation for name
    if (!firstName) {
      setFirstNameError("First Name is required!");
      return false;
    }
    if (!lastName) {
      setLastNameError("Last Name is required!");
      return false;
    }

    const validateName = (name) => {
      const regex = /^[A-Za-z\s]{2,50}$/;
      return regex.test(name);
    };

    if (validateName(firstName)) {
      setFirstNameError("");
    } else {
      setFirstNameError(
        "First Name must be 2-50 characters long and contain only letters and spaces."
      );
      return false;
    }

    if (validateName(lastName)) {
      setLastNameError("");
    } else {
      setLastNameError(
        "Last Name must be 2-50 characters long and contain only letters and spaces."
      );
      return false;
    }

    //validation for email id

    if (!email) {
      setEmailError("Email is required!");
      return false;
    }

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (validateEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address");
      return false;
    }

    if ((await checkEmail({ variables: { email } }))?.data?.checkEmail) {
      setEmailError("Email is already taken!");
      return false;
    } else {
      setEmailError("");
    }

    //Phone number

    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required!");
      return false;
    }

    const validatePhone = (phone) => {
      const regex = /^(\+1)?\d{10}$/;
      return regex.test(phone);
    };

    if (validatePhone(phoneNumber)) {
      setPhoneNumberError("");
    } else {
      setPhoneNumberError(
        "Invalid phone number ! Requried Format: 123 123 1234 / +1 123 123 1234 "
      );
      return false;
    }

    

    //Username

    if (!username) {
      setUsernameError("Username is required!");
      return false;
    }

    const { data } = await checkUsername({ variables: { username } });
    console.log(data);
    if (data.checkUsername) {
      setUsernameError("Username is already taken!");
      return false;
    } else {
      setUsernameError("");
    }



    //Password

    if (!password) {
      setPasswordError("Password is required!");
      return false;
    }

    const validatePassword = (password) => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      return regex.test(password);
    };

    if (validatePassword(password)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character."
      );
      return false;
    }

    if (!rePassword) {
      setRePasswordError("Confirm Password is required!");
      return false;
    }

    //password matching

    if (password === rePassword) {
      setRePasswordError("");
    } else {
      setRePasswordError("Password do not match !");
      return false;
    }

    //Address

    if (!address) {
      setAddressError("Address is required!");
      return false;
    }

    //Insurance number

    if (!insuranceNumber) {
      setInsuranceNumberError("Health Insurance Number is required!");
      return false;
    }

    const validateHealthCardNumber = (no) => {
      const regex = /^[0-9]{4}-[0-9]{3}-[0-9]{3}[A-Z]?$/;
      return regex.test(no);
    };
    if (validateHealthCardNumber(insuranceNumber)) {
      setInsuranceNumberError("");
    } else {
      setInsuranceNumberError("Requried Format: 1234-123-123A");
      return false;
    }

    return true;
  };

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
          <h3>USER REGISTRATION</h3>
          <input
            type="text"
            placeholder="First Name"
            className="inputStyle"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setFirstNameError("");
            }}
          />
          <span className="errorStyle">{firstNameError}</span>
          <input
            type="text"
            placeholder="Last Name"
            className="inputStyle"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setLastNameError("");
            }}
          />
          <span className="errorStyle">{lastNameError}</span>
          <input
            type="text"
            placeholder="Email"
            className="inputStyle"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          <span className="errorStyle">{emailError}</span>

          <input
            type="text"
            placeholder="Phone Number"
            className="inputStyle"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setPhoneNumberError("");
            }}
          />
          <span className="errorStyle">{phoneNumberError}</span>

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
          <span className="errorStyle">{usernameError}</span>

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
          <span className="errorStyle">{passwordError}</span>

          <input
            type="password"
            placeholder="Confirm Password"
            className="inputStyle"
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
              setRePasswordError("");
            }}
          />
          <span className="errorStyle">{rePasswordError}</span>

          <input
            type="text"
            placeholder="Address"
            className="inputStyle"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setAddressError("");
            }}
          />
          <span className="errorStyle">{addressError}</span>

          <input
            type="text"
            placeholder="Health Insurance Number"
            className="inputStyle"
            value={insuranceNumber}
            onChange={(e) => {
              setInsuranceNumber(e.target.value);
              setInsuranceNumberError("");
            }}
          />
          <span className="errorStyle">{insuranceNumberError}</span>

          <button
            type="submit"
            style={{ ...buttonStyle, ...(isButtonHovered && buttonHoverStyle) }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Register
          </button>

          <span className="successMessageStyle">{registrationUpdate}</span>
        </form>
      </div>
    </div>
  );
};

export default Register;
