import React,{useState } from "react";
//import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../Stylesheet/UserStyles.css";
import { useQuery } from "@apollo/client";
import{ GET_USER_APPOINTMENTS_HISTORY } from "../../graphql/middleware";


const AppointmentHistory = () => {
  const storedUsername = sessionStorage.getItem("username");

    
const { data:userData } = useQuery(GET_USER_APPOINTMENTS_HISTORY, {
  variables: { username :storedUsername },
});
  


const handleDetailsClick = (appointmentId) => {
  
  window.location.href = `/UserAppointmentDetails/${appointmentId}`;
  };

  return (
    <div>
      <Menu />
      <div>
        <br />
        <br />
        <h2 className="h2-style ">Appointment History</h2>
        
          <table className="appointment-history-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData?.userHistories.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <button
                      style={{ backgroundColor: "black", color: "white" }}
                      onClick={() => handleDetailsClick(appointment.appointmentId)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentHistory;