import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_APPOINTMENTS_USER } from '../../graphql/middleware';
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

const tableStyle = {
  width: '80%',
  margin: '20px auto',
  borderCollapse: 'collapse',
};

const thStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};
const headStyle ={
    marginTop:'50px',
    textAlign:'center',
    marginBottom:'30px',

};

const UpcomingAppointments = () => {
  const loggedInUser = sessionStorage.getItem("username");
  
  const { data, loading, error } = useQuery(GET_UPCOMING_APPOINTMENTS_USER, {
    variables: { username: loggedInUser }
  });

  console.log('Data:', data);
  console.log('Loading:', loading);
  console.log('Error:', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading upcoming appointments.</p>;

  const upcomingAppointments = data?.getUpcomingAppointmentsUser || [];

  return (
    <div>
      <Menu />
      <h4 style={headStyle}>SCHEDULED APPOINTMENTS</h4>
      <div>
        {upcomingAppointments.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Appointment Date</th>
                <th style={thStyle}>Appointment Time</th>
                <th style={thStyle}>Doctor Name</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(appointment => (
                <tr key={appointment.appointmentId}>
                  <td style={tdStyle}>{appointment.appointmentDate}</td>
                  <td style={tdStyle}>{appointment.appointmentTime}</td>
                  <td style={tdStyle}>Dr. {appointment.doctorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center' }}>No upcoming appointments.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UpcomingAppointments;
