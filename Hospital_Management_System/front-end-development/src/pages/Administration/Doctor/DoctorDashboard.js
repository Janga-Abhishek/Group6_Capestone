import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Menu from "../../../components/Menu";
import "../../../Stylesheet/Doctor.css";

const GET_BOOKED_APPOINTMENTS = gql`
  query GetBookedAppointments($doctorId: ID!, $date: String!) {
    bookedappointments(doctorId: $doctorId, date: $date) {
      id
      username
      appointmentDate
      appointmentTime
      issueDescription
    }
  }
`;

const DoctorDashboard = () => {
  const [doctorId, setDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { loading, error, data } = useQuery(GET_BOOKED_APPOINTMENTS, {
    variables: { doctorId, date: selectedDate.toISOString().split("T")[0] },
    skip: !doctorId || !selectedDate,
  });

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
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
  const appointments = data?.bookedappointments;

  return (
    <div style={{ marginTop: "2%" }}>
      <Menu />
      <div className="dashboard-container">
        <div className="appointments-section">
          <h1 className="dashboard-title">Doctor Dashboard</h1>
          <div className="doctor-info">
            <p>
              <strong>Doctor Name:</strong> {doctorUsername}
            </p>
            {doctorId && (
              <p>
                <strong>Doctor ID:</strong> {doctorId}
              </p>
            )}
          </div>
          <div className="appointments-list">
            <h2 className="appointments-title">Appointments</h2>
            {appointments && appointments.length === 0 ? (
              <p>No appointments for the selected date.</p>
            ) : (
              <ul className="appointment-items">
                {appointments?.map((appointment) => (
                  <li key={appointment.id} className="appointment-item">
                    <div className="appointment-info">
                      <div className="appointment-details">
                        <h3>{appointment.username}</h3>
                        <p>
                          <strong>Date:</strong> {appointment.appointmentDate}
                        </p>
                        <p>
                          <strong>Time:</strong> {appointment.appointmentTime}
                        </p>
                        <p>
                          <strong>Issue:</strong>{" "}
                          {appointment.issueDescription || "Not specified"}
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
            )}
          </div>
        </div>
        <div className="calendar-container">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
