import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_APPOINTMENT_DETAILS } from "../../graphql/middleware";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../Stylesheet/AppointmentDetails.css";

const AppointmentDetails = () => {
  const { id } = useParams();
  
  // State to manage data and loading state
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GraphQL query to fetch appointment details
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_APPOINTMENT_DETAILS, {
    variables: { appointmentId: id },
    onCompleted: (data) => {
      console.log('Query completed with data:', data);
      if (data?.appointmentDetails && data.appointmentDetails.length > 0) {
        setAppointment(data.appointmentDetails[0]); // Extract first element
        console.log('Appointment data set:', data.appointmentDetails[0]); // Log the appointment data
      } else {
        console.warn('No appointment details found in response.');
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching appointment details:', error);
      setError(error);
      setLoading(false);
    }
  });

  
  useEffect(() => {
    console.log('Appointment state:', appointment);
  }, [appointment]);

  
  if (queryLoading || loading) return <p>Loading...</p>;
  if (queryError || error) return <p>Error loading appointment details: {error?.message || 'Unknown error'}</p>;

  return (
    <div className="appointment-details-container">
      <Menu />
      <div className="appointment-details-content">
        <h2 className="appointment-details-title">Appointment Details</h2>
        <div className="appointment-details">
          <p><strong>Appointment ID:</strong> {appointment?.appointmentId || 'N/A'}</p>
          <p><strong>Appointment Date:</strong> {appointment?.appointmentDate || 'N/A'}</p>
          <p><strong>Appointment Time:</strong> {appointment?.appointmentTime || 'N/A'}</p>
          <p><strong>Doctor ID:</strong> {appointment?.doctorId || 'N/A'}</p>
          <p><strong>Issue Description:</strong> {appointment?.issueDescription || 'N/A'}</p>
          <p><strong>Prescribed Medicines:</strong> {appointment?.prescribedMedicines || 'N/A'}</p>
          <p><strong>Status:</strong> {appointment?.status || 'N/A'}</p>
          <p><strong>Additional Notes:</strong> {appointment?.additionalNotes || 'N/A'}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentDetails;
