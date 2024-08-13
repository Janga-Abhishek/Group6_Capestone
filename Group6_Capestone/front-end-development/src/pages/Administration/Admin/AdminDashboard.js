import React, { useEffect } from "react";
import Menu from "../../../components/Menu";
import Card from "react-bootstrap/Card";
import BarChart from "./BarChart";
import AdminMenu from "../../../components/AdminMenu";
import '../../../Stylesheet/AdminDashboard.css';
import PieChart from "./PieChart";
const AdminDashboard = () => {
  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    console.log("User Type:", userType);

    if (userType !== "admin") {
      window.location.href = "/administrationLogin";
    }
  }, []);

  return (
    <div className="mt-5">
      <Menu />
      <h1 className="text-center">Admin Dashboard</h1>
      <div className="main-graph-container">
        <div className="bar-chart-container">
          <BarChart className="barchart" />
        </div>
        <div className="pie-chart-container">
          <PieChart className="piechart" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
