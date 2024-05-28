import React from "react";

const footerContainerStyle = {
  width: "100%",
  backgroundColor: "#1192DC",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
  position: "relative",
  marginTop: "5%",
};

const footerTextStyle = {
  margin: 0,
};

const Footer = () => (
  <div style={footerContainerStyle}>
    <p style={footerTextStyle}>
      &copy; {new Date().getFullYear()} HealthEase. All rights reserved.
    </p>
  </div>
);

export default Footer;
