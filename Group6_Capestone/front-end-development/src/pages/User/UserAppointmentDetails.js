import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_APPOINTMENT_DETAILS } from "../../graphql/middleware";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import html2pdf from "html2pdf.js";
import "../../Stylesheet/AppointmentDetails.css";

const AppointmentDetails = () => {
  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const detailsRef = useRef(null);

  const { loading: queryLoading, error: queryError, data } = useQuery(
    GET_APPOINTMENT_DETAILS,
    {
      variables: { appointmentId: id },
      onCompleted: (data) => {
        console.log("Query completed with data:", data);
        if (data?.appointmentDetails && data.appointmentDetails.length > 0) {
          setAppointment(data.appointmentDetails[0]);
          console.log("Appointment data set:", data.appointmentDetails[0]);
        } else {
          console.warn("No appointment details found in response.");
        }
        setLoading(false);
      },
      onError: (error) => {
        console.error("Error fetching appointment details:", error);
        setError(error);
        setLoading(false);
      },
    }
  );

  useEffect(() => {
    console.log("Appointment state:", appointment);
  }, [appointment]);

  const handleDownloadPDF = () => {
    const element = detailsRef.current;
    const options = {
      margin: 0.5,
      filename: `appointment_${appointment?.appointmentId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  if (queryLoading || loading) return <p>Loading...</p>;
  if (queryError || error)
    return (
      <p>
        Error loading appointment details: {error?.message || "Unknown error"}
      </p>
    );

  return (
    <div className="appointment-details-container">
      <Menu />
      <div className="appointment-details-content">
        <h2 className="appointment-details-title">Appointment Details</h2>
        <div className="appointment-details document" ref={detailsRef}>
          <header className="document-header">
            <img
              src="/images/HealthEase_logo.png"
              alt="Logo"
              className="logoStyle1"
            />
            <h2>HealthEase</h2>
            <p>22 Charter Drive,Kitchener,Ontario</p>
            <p>Phone: (123) 456-7890</p>
          </header>
          <hr />
          <div className="document-body">
            <p>
              <strong>Appointment ID:</strong>{" "}
              {appointment?.appointmentId || "N/A"}
            </p>
            <p>
              <strong>Appointment Date:</strong>{" "}
              {appointment?.appointmentDate || "N/A"}
            </p>
            <p>
              <strong>Appointment Time:</strong>{" "}
              {appointment?.appointmentTime || "N/A"}
            </p>
            <p>
              <strong>Doctor ID:</strong> {appointment?.doctorId || "N/A"}
            </p>
            <p>
              <strong>Issue Description:</strong>{" "}
              {appointment?.issueDescription || "N/A"}
            </p>
            <p>
              <strong>Prescribed Medicines:</strong>{" "}
              {appointment?.prescribedMedicines || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {appointment?.status || "N/A"}
            </p>
            <p>
              <strong>Additional Notes:</strong>{" "}
              {appointment?.additionalNotes || "N/A"}
            </p>
          </div>
          <hr />
          <footer className="document-footer">
            <p>
              &copy; {new Date().getFullYear()} HealthEase.com. All rights
              reserved.
            </p>
          </footer>
        </div>
        <button onClick={handleDownloadPDF} className="download-pdf-button">
          Download as PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentDetails;
