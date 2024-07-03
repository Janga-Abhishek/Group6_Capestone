import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Menu from "../../../components/Menu";
import "../../../Stylesheet/Doctor.css";

const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      patientName
      time
      issue
      previousRecords
    }
  }
`;

const DoctorDashboard = () => {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    console.log("User Type:", userType);

    if (userType !== "doctor") {
      window.location.href = "/administrationLogin";
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "2%" }}>
      <Menu />
      <div className="container">
        <h1 className="dashboard-title">Doctor Dashboard</h1>
        <div className="appointments-list">
          <h2 className="appointments-title">Today's Appointments</h2>
          <ul className="appointment-items">
            {data.appointments.map((appointment) => (
              <li key={appointment.id} className="appointment-item">
                <div className="appointment-info">
                  <div className="appointment-details">
                    <h3>{appointment.patientName}</h3>
                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>
                    <p>
                      <strong>Issue:</strong>{" "}
                      {appointment.issue || "Not specified"}
                    </p>
                    {/* <p>
                      <strong>Previous Records:</strong>{" "}
                      {appointment.previousRecords || "None"}
                    </p> */}
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
