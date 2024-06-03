import React from "react";
import LandingPage from "../../components/LandingPage";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "../../Stylesheet/UserStyles.css";

const UserLanding = () => (
  <LandingPage>
    <div className="containerStyle">
      <h1>Our Services</h1>
      <div className="testAndImageContainerStyle">
        <div className="ServicesStyle">
          <h2 className="headingStyle">Online Appointment Booking</h2>
          <div>
            <p className="paragraphStyle">
              Effortlessly schedule appointments with our intuitive online
              booking system. Patients can book appointments from the comfort of
              their homes, reducing wait times and improving accessibility to
              healthcare services.
            </p>
          </div>
        </div>
        <img
          src="/images/appointment.png"
          alt="appointment schedule"
          className="imageStyle"
        />
      </div>

      <div className="testAndImageContainerStyle">
        <img
          src="/images/medicalRecords.png"
          alt="medical records"
          className="imageStyle"
        />
        <div className="ServicesStyle">
          <h2 className="headingStyle">
            Access Your Previous Hospital Records
          </h2>
          <div>
            <p className="paragraphStyle">
              With HealthEase, your medical records are just a click away. Our
              intuitive platform allows you to access and download your past
              prescriptions, lab reports, imaging results, and more, all from
              the comfort of your home.
            </p>
          </div>
        </div>
      </div>

      <div className="testAndImageContainerStyle">
        <div className="ServicesStyle">
          <h2 className="headingStyle">
            Connect with Us Anytime – 24/7 Service
          </h2>
          <p className="paragraphStyle">
            At HealthEase, we believe that your health never takes a break, and
            neither do we. Our dedicated support team is available around the
            clock to assist you with any questions or concerns you may have.
          </p>
        </div>
        <img
          src="/images/medicalService.jpg"
          alt="medical service"
          className="imageStyle"
        />
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
        <div className="buttonContainerStyle">
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
