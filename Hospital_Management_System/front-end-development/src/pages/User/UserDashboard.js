import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import PopUpModal from "../../components/PopUpModal";
import { useQuery } from "@apollo/client";
import AppointmentPopUp from "../../components/AppointmentPopUp";
import { GET_UPCOMING_APPOINTMENT } from "../../graphql/middleware";

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
  const [openModal, setCloseModal] = useState(false);
  const [appOpenModal, setOpenModal] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  const { data } = useQuery(GET_UPCOMING_APPOINTMENT, {
    variables: { username },
    skip: !username,
    onCompleted: (data) => {
      if (data?.getUpcomingAppointments?.length > 0) {
        setAppointment(data.getUpcomingAppointments[0]);
        setOpenModal(true);
      }
    },
  });

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
    setCloseModal(true);
  }, [navigate]);

  const appCloseModal = () => setOpenModal(false);
  const closeModal = () => setCloseModal(false);

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
          <Link to="/userAppointmentHistory" style={navButtonStyle}>
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
      <PopUpModal openModal={openModal} closeModal={closeModal}/>
      <AppointmentPopUp isOpen={appOpenModal} onClose={appCloseModal} appointment={appointment} />

    </div>
  );
};

export default UserDashboard;
