import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../Stylesheet/Login_Register.css";
import { useMutation } from "@apollo/client";
import { BOOK_APPOINTMENT } from "../../graphql/middleware";

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor:"#f0f5fa",
};

const containerStyle ={
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "110vh",
  width: "100%",
}

const labelStyle = {
  marginBottom: '8px', 
  fontWeight: 'bold',
};

const inputStyle ={
  paddingLeft:"20px",
  marginLeft :"20px",
}

const divStyle ={
  marginTop: "15px",
}


const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#1192DC",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "3%",
  transition: "background-color 0.3s ease",
};




const BookAppointment = () =>{

    const [appointmentDate,setAppointmentDate]= useState("");
    const [appointmentTime,setAppointmentTime]= useState("");
    const [issueDescription,setIssueDescription]= useState("");
    const [appointmentUpdate,setAppointmentUpdate] = useState("");
    const [BookAppointment] = useMutation(BOOK_APPOINTMENT);

    const handleAppointmentBooking = async (e) =>{

      e.preventDefault();

      const storedUsername = sessionStorage.getItem("username");
      console.log(storedUsername);

      try {
        const { data } = await BookAppointment({
          variables: {
            username :storedUsername,
            appointmentdate: appointmentDate,
            appointmenttime: appointmentTime,
            issuedescription: issueDescription,
              
          },
        });
  
        
        console.log("Appointment Booked successfully:", data);
        setAppointmentDate("");
        setAppointmentTime("");
        setIssueDescription("");
  
        setAppointmentUpdate("Appointment is Successful");
      } catch (error) {
        console.error("Error in Booking:", error);
      }

    }


    return (
      <div>
          <Menu />
          <div style={containerStyle}>
              <form style={formStyle} onSubmit={handleAppointmentBooking}>
                  <img
                      src="/images/HealthEase_logo.png"
                      alt="Logo"
                      className="logoStyle"
                  />
                  <h3>BOOK APPOINTMENT</h3>
                  <div style={divStyle}>
                      <label htmlFor="appointment-date" style={labelStyle}>
                          Appointment Date:
                      </label>
                      <input
                          type="date"
                          id="appointment-date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          style={inputStyle}
                          required
                      />
                  </div>
                  <div style={divStyle}>
                      <label htmlFor="appointment-time" style={labelStyle}>
                          Appointment Time:
                      </label>
                      <input
                          type="time"
                          id="appointment-time"
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          style={inputStyle}
                          required
                      />
                  </div>
                  <div style={divStyle}>
                      <label htmlFor="issue-description" style={labelStyle}>
                          Describe Issue:
                      </label>
                      <textarea
                          id="issue-description"
                          value={issueDescription}
                          onChange={(e) => setIssueDescription(e.target.value)}
                          style={inputStyle}
                          required
                      ></textarea>
                  </div>
                  <button type="submit" style={buttonStyle}>Book Appointment</button>
                  <span className="successMessageStyle">{appointmentUpdate}</span>
              </form>
          </div>
          <Footer />
      </div>
  );
};

export default BookAppointment;