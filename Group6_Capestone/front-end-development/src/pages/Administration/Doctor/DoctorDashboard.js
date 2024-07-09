import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Menu from "../../../components/Menu";
import "../../../Stylesheet/Doctor.css";

const GET_BOOKED_APPOINTMENTS = gql`
  query GetBookedAppointments {
    bookedappointments {
      id
      username
      appointmentdate
      appointmenttime
      issuedescription
    }
  }
`;

const DoctorDashboard = () => {
  const { loading, error, data } = useQuery(GET_BOOKED_APPOINTMENTS);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    const doctorUsername = sessionStorage.getItem("username");
    const storedDoctorId = sessionStorage.getItem("doctorId");

    if (userType !== "doctor") {
      window.location.href = "/administrationLogin";
    }

    if (storedDoctorId) {
      setDoctorId(storedDoctorId);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const doctorUsername = sessionStorage.getItem("username");

  return (
    <div style={{ marginTop: "2%" }}>
      <Menu />
      <div className="container">
        <h1 className="dashboard-title">Doctor Dashboard</h1>
        <div className="doctor-info">
          <p>
            <strong>Username:</strong> {doctorUsername}
          </p>
          {doctorId && (
            <p>
              <strong>Doctor ID:</strong> {doctorId}
            </p>
          )}
        </div>
        <div className="appointments-list">
          <h2 className="appointments-title">Today's Appointments</h2>
          <ul className="appointment-items">
            {data.bookedappointments.map((appointment) => (
              <li key={appointment.id} className="appointment-item">
                <div className="appointment-info">
                  <div className="appointment-details">
                    <h3>{appointment.username}</h3>
                    <p>
                      <strong>Date:</strong> {appointment.appointmentdate}
                    </p>
                    <p>
                      <strong>Time:</strong> {appointment.appointmenttime}
                    </p>
                    <p>
                      <strong>Issue:</strong>{" "}
                      {appointment.issuedescription || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="appointment-actions">
                  <a
                    className="detail-button"
                    href={`/appointmentDetail/${appointment.id}`}
                  >
                    Details
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
