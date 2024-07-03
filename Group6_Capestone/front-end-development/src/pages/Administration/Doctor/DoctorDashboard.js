import React, { useEffect } from "react";
import Menu from "../../../components/Menu";

const DoctorDashboard = () => {
  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    console.log("User Type:", userType);
  }, []);

  const renderDoctorMenu = () => {
    const userType = sessionStorage.getItem("userType");
    if (userType === "doctor") {
      return <Menu />;
    }
  };
  return (
    <div>
      {renderDoctorMenu()}
      <div></div>Doctor dashboard
    </div>
  );
};

export default DoctorDashboard;
