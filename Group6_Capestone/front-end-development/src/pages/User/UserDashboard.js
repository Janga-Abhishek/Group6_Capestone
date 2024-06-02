import React from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
  width: "100%",
};

const bannerStyle = {
  width: "100%",
  height: "300px",
  backgroundImage: "url('/images/banner_image.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  marginBottom: "20px",
};

const navContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  width: "80%",
  marginTop: "20px",
};

const navButtonStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  color: "#333",
};

const navImageStyle = {
  width: "100px",
  height: "100px",
  marginBottom: "10px",
};

const navTextStyle = {
  fontSize: "1.1em",
  fontWeight: "bold",
};

const UserDashboard = () => {
  return (
    <div>
      <Menu />
      <div style={containerStyle}>
        <div style={bannerStyle}></div>
        <div style={navContainerStyle}>
          <Link to="/profile" style={navButtonStyle}>
            <img src="/images/test.png" alt="Profile" style={navImageStyle} />
            <span style={navTextStyle}>Profile</span>
          </Link>
          <Link to="/appointments" style={navButtonStyle}>
            <img
              src="/images/test.png"
              alt="Appointments"
              style={navImageStyle}
            />
            <span style={navTextStyle}>Appointments</span>
          </Link>
          <Link to="/medical_records" style={navButtonStyle}>
            <img
              src="/images/test.png"
              alt="Medical Records"
              style={navImageStyle}
            />
            <span style={navTextStyle}>Medical Records</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
