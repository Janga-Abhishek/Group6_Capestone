import React, {useState} from 'react';
import {useQuery } from "@apollo/client";
import { GET_USERS } from '../../../graphql/middleware';
import Table from 'react-bootstrap/Table';
import AdminMenu from '../../../components/AdminMenu';


export default function PatientsList(){
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, error, data } = useQuery(GET_USERS);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error : {error.message}</p>;
    
      const filteredPatients = data.users.filter((patient) => patient.userType === 'patient' && 
      `${patient.firstname} ${patient.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <div>
        <AdminMenu />
        <div className="doctor-main-container">
          <div className="doctor-search-add d-flex w-90 justify-content-between p-2 m-3 border border-success align-items-center">
            <div className="doctor-search w-50 border-border-primary">
              <input
                className="w-100 p-2 rounded"
                type="text"
                placeholder="Search patient"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
             {/* <div className="doctor-add w-25">
             <a href="#" className="text-decoration-none bg-success text-white p-2 w-50 rounded"> 
              <button className="bg bg-success p-2 text-white border border-none rounded" onClick={handleAddDoctor}>Add Doctor</button>
            </div>*/}
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.firstname}</td>
                  <td>{patient.lastname}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phonenumber}</td>
                  <td>{patient.address}</td>
                  <td>{patient.userType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
}