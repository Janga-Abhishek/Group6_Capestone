import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GET_DOCTORS } from "../../../graphql/middleware";
import AdminMenu from "../../../components/AdminMenu"
import Table from 'react-bootstrap/Table'
import Modal from "react-bootstrap/Modal";
import AddDoctorModal from "./AddDoctorModal";

export default function DoctorsList(){
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal]=useState(false);
  
    const { loading, error, data } = useQuery(GET_DOCTORS);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    const filteredDoctors = data.doctors.filter((doctor) => doctor.userType === 'doctor' && 
      `${doctor.firstname} ${doctor.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()));
  
    /*--------------------MODAL TO ADD DOCTOR------------------------- */
  
    const handleAddDoctor = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false)
    return(
        <div>
        <AdminMenu />
        <div className="doctor-main-container">
          <div className="doctor-search-add d-flex w-90 justify-content-between p-2 m-3 border border-success align-items-center">
            <div className="doctor-search w-50 border-border-primary">
              <input
                className="w-100 p-2 rounded"
                type="text"
                placeholder="Search doctor"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="doctor-add w-25">
              {/* <a href="#" className="text-decoration-none bg-success text-white p-2 w-50 rounded"> */}
              <button className="bg bg-success p-2 text-white border border-none rounded" onClick={handleAddDoctor}>Add Doctor</button>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.firstname}</td>
                  <td>{doctor.lastname}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phonenumber}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.userType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
  
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <AddDoctorModal />
          </Modal.Body>
        </Modal>
      </div>        
    )
}