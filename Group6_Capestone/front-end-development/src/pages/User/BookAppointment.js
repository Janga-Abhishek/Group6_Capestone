import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../Stylesheet/Login_Register.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DEPARTMENTS, GET_DOCTORS_BY_DEPARTMENT, GET_AVAILABLE_DATES, GET_AVAILABLE_TIMES, BOOK_APPOINTMENT } from "../../graphql/middleware";
import Chatbot from "../Chatbot/Chatbot";

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
  backgroundColor: "#f0f5fa",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "110vh",
  width: "100%",
};

const labelStyle = {
  marginBottom: '8px',
  fontWeight: 'bold',
};

const inputStyle = {
  paddingLeft: "20px",
  marginLeft: "20px",
};

const divStyle = {
  marginTop: "15px",
};

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

const BookAppointment = () => {
  const loggedInUser = sessionStorage.getItem("username");
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [appointmentUpdate, setAppointmentUpdate] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);

  const [BookAppointment] = useMutation(BOOK_APPOINTMENT);

  const { data: departmentData } = useQuery(GET_DEPARTMENTS);
  const { data: doctorData } = useQuery(GET_DOCTORS_BY_DEPARTMENT, {
    variables: { departmentId },
    skip: !departmentId,
  });

  const { data: dateData } = useQuery(GET_AVAILABLE_DATES, {
    variables: { doctorId },
    skip: !doctorId,
  });

  const { data: timeData } = useQuery(GET_AVAILABLE_TIMES, {
    variables: { doctorId, date: appointmentDate },
    skip: !doctorId || !appointmentDate,
  });

  useEffect(() => {
    if (dateData?.availableDates) {
      const today = new Date().toISOString().split('T')[0];
      const futureDates = dateData.availableDates.filter(date => date.appointmentDate >= today);
      const sortedDates = [...futureDates].sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
      setFilteredDates(sortedDates);
    }
  }, [dateData]);

  useEffect(() => {
    if (timeData?.availableTimes) {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Get HH:MM format
      
      const filteredTimes = appointmentDate === today
        ? timeData.availableTimes.filter(time => time.appointmentTime > currentTime)
        : timeData.availableTimes;

        const sortedTimes = [...filteredTimes].sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.appointmentTime}:00`).getTime();
          const timeB = new Date(`1970-01-01T${b.appointmentTime}:00`).getTime();
          return timeA - timeB;
        });

      setAvailableTimes(sortedTimes.map(time => time.appointmentTime));
    }
  }, [timeData, appointmentDate]);

  const handleAppointmentBooking = async (e) => {
    e.preventDefault();

    const storedUsername = sessionStorage.getItem("username");

    try {
      const { data } = await BookAppointment({
        variables: {
          username: storedUsername,
          doctorId,
          appointmentDate,
          appointmentTime,
          issueDescription,
          subscription,
        },
      });

      console.log("Appointment Booked successfully:", data);
      setDepartmentId("");
      setDoctorId("");
      setAppointmentDate("");
      setAppointmentTime("");
      setIssueDescription("");
      setSubscription(false);

      setAppointmentUpdate("Appointment is Successful");
      window.location.reload();
    } catch (error) {
      console.error("Error in Booking:", error);
    }
  };

  return (
    <div>
      <Menu />
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleAppointmentBooking}>
          <img src="/images/HealthEase_logo.png" alt="Logo" className="logoStyle" />
          <h3>BOOK APPOINTMENT</h3>
          <div style={divStyle}>
            <label htmlFor="department" style={labelStyle}>
              Department:
            </label>
            <select
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Select Department</option>
              {departmentData?.departments?.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.departmentname}
                </option>
              ))}
            </select>
          </div>
          <div style={divStyle}>
            <label htmlFor="doctor" style={labelStyle}>
              Doctor:
            </label>
            <select
              id="doctor"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Select Doctor</option>
              {doctorData?.doctorsByDepartment?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.firstname + " " + doctor.lastname}
                </option>
              ))}
            </select>
          </div>
          <div style={divStyle}>
            <label htmlFor="appointment-date" style={labelStyle}>
              Appointment Date:
            </label>
            <select
              id="appointment-date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Select Date</option>
              {filteredDates.map((appointment) => (
                <option key={appointment.appointmentDate} value={appointment.appointmentDate}>
                  {appointment.appointmentDate}
                </option>
              ))}
            </select>
          </div>

          <div style={divStyle}>
            <label htmlFor="appointment-time" style={labelStyle}>
              Appointment Time:
            </label>
            <select
              id="appointment-time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Select Time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
          <div style={divStyle}>
            <label htmlFor="subscription" style={labelStyle}>
              Subscribe for Notifications:
            </label>
            <input
              type="checkbox"
              id="subscription"
              checked={subscription}
              onChange={(e) => setSubscription(e.target.checked)}
            />
          </div>
          <button type="submit" style={buttonStyle}>Book Appointment</button>
          <span className="successMessageStyle">{appointmentUpdate}</span>
        </form>
      </div>
      <div className="chatbot-container" style={{ position: "fixed", bottom: "110px", right: "80px", width: "300px", zIndex: 999 }}>
        <Chatbot loggedInUser={loggedInUser} />
      </div>
      <Footer />
    </div>
  );
};

export default BookAppointment;
