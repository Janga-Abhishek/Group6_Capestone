import AdminMenu from "../../../components/AdminMenu";
import Card from "react-bootstrap/Card";
import BarChart from "./BarChart";
import Footer from "../../../components/Footer";

export default function AdminDashboard() {
  return (
    <div>
      <AdminMenu className="admin-menu" />
      {/* <h1 className="text-center">This is admin Dashboard</h1> */}
      <div className="p-2">
        <div style={{width:"70%"}} className="barChartContainer mx-auto">
          <BarChart className="barchart" />
        </div>
        <div style={{marginTop:"3rem", marginBottom:"3rem"}} className="analytics-container d-flex flex-wrap justify-content-evenly text-center">
          <Card bg="success text-white" style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
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
      <Footer />
    </div>
  );
}
