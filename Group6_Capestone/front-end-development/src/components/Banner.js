import React from "react";

const bannerStyle = {
  textAlign: "center",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginTop: "5%",
};

const imgStyle = {
  width: "90%",
  objectFit: "cover",
};

const h1Style = {
  marginTop: "10px",
  fontSize: "2.5em",
};

const Banner = ({ text }) => (
  <div style={bannerStyle}>
    <img
      src="/images/HealthEaseBanner.png"
      alt="HealthEase Banner"
      style={imgStyle}
    />
    <h1 style={h1Style}>{text}</h1>
  </div>
);

export default Banner;
