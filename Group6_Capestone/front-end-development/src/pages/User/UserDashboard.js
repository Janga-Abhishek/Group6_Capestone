import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  width: "100%",
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
  border: "3px solid black",
  margin: "1%",
  padding: "3%",
  backgroundColor: "#1292DC",
  width: "33.33%",
};

const navImageStyle = {
  width: "80%",
  height: "80%",
  marginBottom: "10px",
  borderRadius: "20%",
  border: "2px dotted black",
};

const navTextStyle = {
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "white",
};

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Menu />
      <div style={{ marginTop: "20px", float: "right", marginRight: "20px" }}>
        {username && (
          <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
            Welcome, {username}!
          </h2>
        )}
      </div>

      <Banner />
      <div style={containerStyle}>
        <div style={navContainerStyle}>
          <Link to="/bookAppointments" style={navButtonStyle}>
            <img
              src="/images/appointment.png"
              alt="Appointments"
              style={navImageStyle}
            />
            <span style={navTextStyle}>Appointments</span>
          </Link>
          <Link to="/uploadPrescription" style={navButtonStyle}>
            <img
              src="/images/HealthEase_logo.png"
              alt="Upload Prescription"
              style={navImageStyle}
            />
            <span style={navTextStyle}>Upload Prescription</span>
          </Link>
          <Link to="/medical_records" style={navButtonStyle}>
            <img
              src="/images/medicalRecords.png"
              alt="Medical Records"
              style={navImageStyle}
            />
            <span style={navTextStyle}>Medical Records</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
