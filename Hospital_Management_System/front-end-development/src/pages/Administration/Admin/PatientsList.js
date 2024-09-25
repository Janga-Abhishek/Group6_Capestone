import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../graphql/middleware";
import Table from "react-bootstrap/Table";
import Menu from "../../../components/Menu";
import '../../../Stylesheet/PatientDashboard.css'
import Card from "react-bootstrap/Card";

export default function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_USERS);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const filteredPatients = data.users.filter(
    (patient) =>
      patient.userType === "patient" &&
      `${patient.firstname} ${patient.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Menu />
      <div className="patient-main-container mt-5">
        <div className="patient-search-add d-flex w-80 mb-5 mt-5 justify-content-center align-items-center">
          <div className="patient-search w-50">
            <input
              className="w-100 p-2 rounded"
              type="text"
              placeholder="Search patient"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="patient-cards-container d-flex flex-wrap justify-content-around mt-5">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="patient-card">
              <Card.Body>
                <span className="initials"><h2>{patient.firstname[0]} {patient.lastname[0]}</h2></span>
                <Card.Title className="mt-2 p-1">{patient.firstname} {patient.lastname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted p-1">{patient.userType}</Card.Subtitle>
                <Card.Text>
                  <strong className="p-1 m-1">Email:</strong> {patient.email}<br />
                  <strong className="p-1 m-1">Mobile:</strong> {patient.phonenumber}<br />
                  <strong className="p-1 m-1">Address:</strong> {patient.address}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

 