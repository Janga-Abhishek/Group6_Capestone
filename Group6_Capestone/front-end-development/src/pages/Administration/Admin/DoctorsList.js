import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { GET_DOCTORS } from "../../../graphql/middleware";
import Menu from "../../../components/Menu";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import AddDoctorModal from "./AddDoctorModal";
import '../../../Stylesheet/DoctorDashboard.css'

export default function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_DOCTORS);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const filteredDoctors = data.doctors.filter(
    (doctor) =>
      doctor.userType === "doctor" &&
      `${doctor.firstname} ${doctor.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  /*--------------------MODAL TO ADD DOCTOR------------------------- */

  const handleAddDoctor = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  return (
    <div>
      <Menu />
      <div className="doctor-main-container mt-5">
        <div className="doctor-search-add d-flex w-80 justify-content-center align-items-center">
          <div className="doctor-search w-50">
            <input
              className="w-100 p-2 rounded"
              type="text"
              placeholder="Search doctor"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="doctor-add w-25 ">
            <button
              className="bg bg-success p-2  text-white border border-none rounded"
              onClick={handleAddDoctor}
            >
              Add Doctor
            </button>
          </div>
        </div>
        <div className="doctor-cards-container d-flex flex-wrap justify-content-around mt-5">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="doctor-card">
              <Card.Body>
                <span className="initials"><h2>{doctor.firstname[0]} {doctor.lastname[0]}</h2></span>
                <Card.Title className="mt-2 p-1">{doctor.firstname} {doctor.lastname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted p-1">{doctor.userType}</Card.Subtitle>
                <Card.Text>
                  <strong className="p-1 m-1">Email:</strong> {doctor.email}<br />
                  <strong className="p-1 m-1">Mobile:</strong> {doctor.phonenumber}<br />
                  <strong className="p-1 m-1">Address:</strong> {doctor.address}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddDoctorModal />
        </Modal.Body>
      </Modal>
    </div>
  );
}
