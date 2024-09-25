import React from "react";
import Banner from "./Banner";
import Menu from "./Menu";

const LandingPage = ({ bannerText, children }) => (
  <div>
    <Menu />
    <Banner text={bannerText} />
    <div className="content">{children}</div>
  </div>
);

export default LandingPage;
