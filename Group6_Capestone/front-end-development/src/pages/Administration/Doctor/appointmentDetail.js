import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Menu from "../../../components/Menu";

const GET_BOOKED_APPOINTMENT = gql`
  query GetBookedAppointment($id: ID!) {
    bookedappointment(id: $id) {
      id
      username
      appointmentdate
      appointmenttime
      issuedescription
    }
  }
`;

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescribedMedicine, setPrescribedMedicine] = useState("");

  const { loading, error, data } = useQuery(GET_BOOKED_APPOINTMENT, {
    variables: { id },
  });

  useEffect(() => {
    console.log("ID:", id); // Log the id
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);
    if (data && data.bookedappointment) {
      console.log("Fetched Appointment Details:", data.bookedappointment);
    }
  }, [id, loading, error, data]);

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

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div>
        <Menu />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Error Fetching Appointment</h1>
          <p style={{ textAlign: "center" }}>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.bookedappointment) {
    console.error("Data not found:", data);
    return (
      <div>
        <Menu />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Appointment Not Found</h1>
          <p style={{ textAlign: "center" }}>Data not found for ID: {id}</p>
        </div>
      </div>
    );
  }

  const { bookedappointment } = data;

  const navigateToHistory = () => {
    navigate(`/history/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Prescribed Medicines: ${prescribedMedicine}`);
    // Implement your logic to save prescribed medicines
  };

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
              {bookedappointment.username}
            </h2>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Date:</strong> {bookedappointment.appointmentdate}
            </p>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Time:</strong> {bookedappointment.appointmenttime}
            </p>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Issue:</strong>{" "}
              {bookedappointment.issuedescription || "Not specified"}
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
