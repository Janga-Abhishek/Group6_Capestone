import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminMenu() {
  return (
    <Navbar style={{height:"80px",backgroundColor:"#1192dc"}} expand="lg" className="text-white p-2 ">
      <Container>
        {/* <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            <Nav.Link className="text-white" href="/adminDashboard">
            <img style={{width:"70px", height:"auto",margin:"0.5rem",borderRadius:"50%"}} src="/images/HealthEase_logo.png" alt="Logo" /><strong>HEALTHEASE</strong>
            </Nav.Link>
        <Navbar.Collapse id="basic-navbar-nav justify-centent-end">
          <Nav className="mx-auto p-2 justify-content-between">
            <Nav.Link className="text-white" href="/doctorsList">
              DoctorsList
            </Nav.Link>
            <Nav.Link className="text-white" href="/patientsList">
              PatientsList
            </Nav.Link>
            <Nav.Link className="text-white" href="#appointments">
              EmployeeList
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
              Store
            </Nav.Link>
            <Nav.Link className="text-white" href="#home">
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
