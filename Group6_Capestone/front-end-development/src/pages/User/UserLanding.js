import React from "react";
import LandingPage from "../../components/LandingPage";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const testAndImageContainerStyle = {
  display: "flex",
  margin: "20px",
  width: "50%",
  alignItems: "center",
  border: "1px solid #ccc",
  padding: "3%",
  borderTopRightRadius: "20%",
  borderBottomLeftRadius: "20%",
  boxShadow: "0 8px 16px rgba(17, 146, 300, 0.5)",
};

const ServicesStyle = {
  padding: "20px",
  marginRight: "20px",
  flex: 1,
};

const imageStyle = {
  maxWidth: "300px",
  border: "2px solid black",
  borderRadius: "50%",
  boxShadow: "0 8px 16px rgba(17, 146, 300, 0.5)",
};
const headingStyle = {
  fontSize: "1.5em",
  margin: "0 0 10px 0",
};

const paragraphStyle = {
  fontSize: "1em",
  lineHeight: "1.5",
  margin: "0 0 10px 0",
};
const buttonContainerStyle = {
  marginTop: "20px",
  textAlign: "center",
};

const UserLanding = () => (
  <LandingPage>
    <div style={containerStyle}>
      <h1>Our Services</h1>
      <div style={testAndImageContainerStyle}>
        <div style={ServicesStyle}>
          <h2 style={headingStyle}>Online Appointment Booking</h2>
          <div>
            <p style={paragraphStyle}>
              Effortlessly schedule appointments with our intuitive online
              booking system. Patients can book appointments from the comfort of
              their homes, reducing wait times and improving accessibility to
              healthcare services.
            </p>
          </div>
        </div>
        <img src="/images/appointment.jpeg" alt="logo 1" style={imageStyle} />
      </div>

      <div style={testAndImageContainerStyle}>
        <img src="/images/medicalRecords.png" alt="logo 2" style={imageStyle} />
        <div style={ServicesStyle}>
          <h2 style={headingStyle}>Access Your Previous Hospital Records</h2>
          <div>
            <p style={paragraphStyle}>
              With HealthEase, your medical records are just a click away. Our
              intuitive platform allows you to access and download your past
              prescriptions, lab reports, imaging results, and more, all from
              the comfort of your home.
            </p>
          </div>
        </div>
      </div>

      <div style={testAndImageContainerStyle}>
        <div style={ServicesStyle}>
          <h2 style={headingStyle}>Connect with Us Anytime – 24/7 Service</h2>
          <p style={paragraphStyle}>
            At HealthEase, we believe that your health never takes a break, and
            neither do we. Our dedicated support team is available around the
            clock to assist you with any questions or concerns you may have.
          </p>
        </div>
        <img src="/images/medicalService.jpg" alt="logo 3" style={imageStyle} />
      </div>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid black",
          padding: "4%",
          backgroundColor: "aliceblue",
          borderRadius: "10%",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Want to join us?</h2>
        <p>
          If you're new here, you can sign up for an account to access all our
          services.
        </p>
        <div style={buttonContainerStyle}>
          <Link to="/register">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1em",
                backgroundColor: "#1192DC",
                color: "white",
                border: "none",
                borderRadius: "10%",
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </LandingPage>
);

export default UserLanding;
