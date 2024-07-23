import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import Menu from "../../../components/Menu";

const GET_BOOKED_APPOINTMENT = gql`
  query GetBookedAppointment($id: ID!) {
    bookedappointment(id: $id) {
      id
      username
      appointmentDate
      appointmentTime
      issueDescription
    }
  }
`;

const GET_USER_HISTORIES = gql`
  query GetUserHistories($username: String!) {
    userHistories(username: $username) {
      appointmentId
      appointmentDate
      appointmentTime
      issueDescription
      prescribedMedicines
      doctorId
      status
      additionalNotes
    }
  }
`;

const CREATE_USER_HISTORY = gql`
  mutation CreateUserHistory(
    $username: String!
    $appointmentId: ID!
    $appointmentDate: String!
    $appointmentTime: String!
    $issueDescription: String!
    $prescribedMedicines: String!
    $doctorId: ID!
    $status: String!
    $additionalNotes: String!
  ) {
    createUserHistory(
      username: $username
      appointmentId: $appointmentId
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
      issueDescription: $issueDescription
      prescribedMedicines: $prescribedMedicines
      doctorId: $doctorId
      status: $status
      additionalNotes: $additionalNotes
    ) {
      id
      username
      appointmentId
      appointmentDate
      appointmentTime
      issueDescription
      prescribedMedicines
      doctorId
      status
      additionalNotes
    }
  }
`;

const DELETE_BOOKED_APPOINTMENT = gql`
  mutation DeleteBookedAppointment($id: ID!) {
    deleteBookedAppointment(id: $id) {
      id
    }
  }
`;

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([
    { name: "", days: 1, timesPerDay: 1 },
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState(""); // New state for additional notes
  const currentDoctorId = sessionStorage.getItem("doctorId");
  console.log("Current Doctor ID:", currentDoctorId);
  const { loading, error, data } = useQuery(GET_BOOKED_APPOINTMENT, {
    variables: { id },
  });

  const [createUserHistory] = useMutation(CREATE_USER_HISTORY);
  const [deleteBookedAppointment] = useMutation(DELETE_BOOKED_APPOINTMENT);

  const { data: historyDataResult } = useQuery(GET_USER_HISTORIES, {
    variables: { username: data?.bookedappointment?.username },
    skip: !data?.bookedappointment?.username || !showHistory,
    onCompleted: (data) => {
      console.log("Fetched user histories:", data.userHistories);
      setHistoryData(data.userHistories);
    },
    onError: (error) => {
      console.error("Error fetching user histories:", error);
    },
  });

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

  const addMedicineField = () => {
    setMedicines([...medicines, { name: "", days: 1, timesPerDay: 1 }]);
  };

  const handleChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prescribedMedicines = medicines
      .map(
        (med) =>
          `${med.name}: ${med.days} day(s), ${med.timesPerDay} time(s) per day`
      )
      .join("\n");

    try {
      await createUserHistory({
        variables: {
          username: bookedappointment.username,
          appointmentId: bookedappointment.id,
          appointmentDate: bookedappointment.appointmentDate,
          appointmentTime: bookedappointment.appointmentTime,
          issueDescription: bookedappointment.issueDescription,
          prescribedMedicines,
          doctorId: currentDoctorId,
          status: "completed",
          additionalNotes, // Pass additional notes to the mutation
        },
      });

      await deleteBookedAppointment({
        variables: { id: bookedappointment.id },
      });

      alert("User history updated successfully!");
      navigate("/doctorDashboard");
    } catch (error) {
      console.error("Error creating user history:", error.message);
      alert("Error creating user history. Check the console for details.");
    }
  };

  const handleViewHistory = () => {
    setShowHistory(!showHistory);
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
              <strong>Date:</strong> {bookedappointment.appointmentDate}
            </p>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Time:</strong> {bookedappointment.appointmentTime}
            </p>
            <p style={{ marginBottom: "10px", color: "#666" }}>
              <strong>Issue:</strong> {bookedappointment.issueDescription}
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label
                    htmlFor="prescribedMedicines"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Prescribed Medicines
                  </label>
                  {medicines.map((med, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr auto auto",
                        gap: "10px",
                        marginBottom: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <label
                          htmlFor={`medicineName-${index}`}
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Medicine Name
                        </label>
                        <input
                          type="text"
                          id={`medicineName-${index}`}
                          value={med.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`days-${index}`}
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Days
                        </label>
                        <input
                          type="number"
                          id={`days-${index}`}
                          value={med.days}
                          onChange={(e) =>
                            handleChange(index, "days", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                          }}
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`timesPerDay-${index}`}
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Times per Day
                        </label>
                        <input
                          type="number"
                          id={`timesPerDay-${index}`}
                          value={med.timesPerDay}
                          onChange={(e) =>
                            handleChange(index, "timesPerDay", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                          }}
                          min="1"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedMedicines = medicines.filter(
                            (_, i) => i !== index
                          );
                          setMedicines(updatedMedicines);
                        }}
                        style={{
                          backgroundColor: "#f44336",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMedicineField}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    Add Medicine
                  </button>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="additionalNotes"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "8px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#2196F3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Save & Complete
                </button>
              </div>
            </form>
            <button
              onClick={handleViewHistory}
              style={{
                backgroundColor: "#FFC107",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              {showHistory ? "Hide History" : "View History"}
            </button>
            {showHistory && (
              <div style={{ marginTop: "20px" }}>
                <h2>Appointment History</h2>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Appointment ID
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Date
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Time
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((history) => (
                      <tr key={history.appointmentId}>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {history.appointmentId}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {history.appointmentDate}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {history.appointmentTime}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          <button
                            onClick={() =>
                              alert(
                                `Details:\n\nAppointment ID: ${history.appointmentId}\nDate: ${history.appointmentDate}\nTime: ${history.appointmentTime}\nIssue: ${history.issueDescription}\nMedicines: ${history.prescribedMedicines}\nAdditional Notes: ${history.additionalNotes}`
                              )
                            }
                            style={{
                              backgroundColor: "#2196F3",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              padding: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
