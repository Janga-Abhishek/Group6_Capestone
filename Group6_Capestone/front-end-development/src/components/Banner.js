import React from "react";

const bannerStyle = {
  textAlign: "center",
  padding: "20px",
};

const imgStyle = {
  width: "100%",
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
