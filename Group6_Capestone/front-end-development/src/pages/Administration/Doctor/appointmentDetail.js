import React, { useEffect, useState } from "react";
import Menu from "../../../components/Menu";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_APPOINTMENT = gql`
  query GetAppointment($id: ID!) {
    appointment(id: $id) {
      id
      patientName
      time
      issue
      previousRecords
    }
  }
`;

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescribedMedicine, setPrescribedMedicine] = useState("");

  const { loading, error, data } = useQuery(GET_APPOINTMENT, {
    variables: { id },
  });

  const navigateToHistory = () => {
    navigate(`/history/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Prescribed Medicines: ${prescribedMedicine}`);
    // Implement your logic to save prescribed medicines
  };

  if (loading) {
    return (
      <div>
        <Menu />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !data.appointment) {
    return (
      <div>
        <Menu />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Appointment Not Found</h1>
        </div>
      </div>
    );
  }

  const { appointment } = data;

  return (
    <div>
      <Menu />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1
          style={{ textAlign: "center", marginBottom: "20px", marginTop: "2%" }}
        >
          Appointment Details
        </h1>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ flex: "1" }}>
            <h2 style={{ marginBottom: "15px", color: "#333" }}>
              {appointment.patientName}
            </h2>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Issue:</strong> {appointment.issue || "Not specified"}
            </p>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Previous Records:</strong>{" "}
              {appointment.previousRecords || "None"}
            </p>
            <button onClick={navigateToHistory} className="detail-button">
              Previous History
            </button>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Prescribed Medicines or Treatment:
                </label>
                <textarea
                  value={prescribedMedicine}
                  onChange={(e) => setPrescribedMedicine(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button type="submit" className="detail-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
