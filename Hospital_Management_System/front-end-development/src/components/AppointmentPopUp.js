import React from "react";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  width: "80%",
  textAlign: "center",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#1292DC",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const AppointmentPopUp = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h4>You have an Upcoming Appointment</h4>
        <p><strong>Date:</strong> {appointment.appointmentDate}</p>
        <p><strong>Time:</strong> {appointment.appointmentTime}</p>
        <button style={buttonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentPopUp;
