import React,{useState} from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../Stylesheet/UserStyles.css";
import { useQuery } from "@apollo/client";
import{ GET_USER_APPOINTMENTS_HISTORY} from "../../graphql/middleware";




const AppointmentHistory = () => {
    const storedUsername = sessionStorage.getItem("username");

    console.log('1',storedUsername);
    
    const { data:userData } = useQuery(GET_USER_APPOINTMENTS_HISTORY, {
      variables: { username :storedUsername },
    });
   console.log('2',userData);

   const handleDetailsClick = ()=>{

   }
   
  
   return (
    <div>
      <Menu />
      <div><br/><br/>
        <h2>Appointment History</h2>
        <table className="appointment-history-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Doctor ID</th>
              <th>Status</th>
              <th>Action</th> {/* New column for the button */}
            </tr>
          </thead>
          <tbody>
            {userData?.userHistories.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td> 
                <td>{appointment.doctorId}</td>
                <td>{appointment.status}</td>
                
                <td>
                  <button 
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={() => handleDetailsClick(appointment._id)}
                  >
                    Details
                  </button>
                </td> {/* New column for the button */}
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