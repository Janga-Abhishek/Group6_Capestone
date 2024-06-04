import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminMenu(){
    return(
        <Navbar expand="lg" className="bg-primary text-white p-2 ">
        <Container>
          {/* <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto p-2 justify-content-between">
              <Nav.Link className='text-white' href="#doctors">Doctors</Nav.Link>
              <Nav.Link className='text-white' href="#patients">Patients</Nav.Link>
              <Nav.Link className='text-white' href="#appointments">Appointments</Nav.Link>
              <Nav.Link className='text-white' href="#link">Store</Nav.Link>
              <Nav.Link className='text-white' href="#home">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}