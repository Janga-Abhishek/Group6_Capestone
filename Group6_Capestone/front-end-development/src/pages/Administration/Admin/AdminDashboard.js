import React, { useEffect } from "react";
import Menu from "../../../components/Menu";
import Card from "react-bootstrap/Card";
import BarChart from "./BarChart";

const AdminDashboard = () => {
  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    console.log("User Type:", userType);

    if (userType !== "admin") {
      window.location.href = "/administrationLogin";
    }
  }, []);

  return (
    <div>
      <Menu />
      <h1 className="text-center">This is admin Dashboard</h1>
      <div className="p-2 border border-primary">
        <div className="barChartContainer w-100 mx-auto border border-danger">
          <BarChart className="barchart" />
        </div>
        <div className="analytics-container d-flex flex-wrap justify-content-evenly text-center">
          <Card bg="success text-white" style={{ width: "18rem" }}>
            <Card.Header>Total Patients</Card.Header>
            <Card.Body>
              <Card.Text className="align-items-center">
                <h3>1000k</h3>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="primary text-white" style={{ width: "18rem" }}>
            <Card.Header>Total Staff</Card.Header>
            <Card.Body>
              <Card.Text>
                <h3>4500</h3>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="danger text-white" style={{ width: "18rem" }}>
            <Card.Header>Critical Issues</Card.Header>
            <Card.Body>
              <Card.Text>
                <h3>20</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
