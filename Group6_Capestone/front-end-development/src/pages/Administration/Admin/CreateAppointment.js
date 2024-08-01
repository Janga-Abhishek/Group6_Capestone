import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Menu from "../../../components/Menu";
import {
  GET_DOCTORS,
  CREATE_APPOINTMENT,
  GET_APPOINTMENTS,
} from "../../../graphql/middleware";

const CreateAppointment = () => {
  const {
    loading: doctorsLoading,
    error: doctorsError,
    data: doctorsData,
  } = useQuery(GET_DOCTORS);
  const {
    loading: appointmentsLoading,
    error: appointmentsError,
    data: appointmentsData,
  } = useQuery(GET_APPOINTMENTS);

  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    refetchQueries: [{ query: GET_APPOINTMENTS }],
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [filterDoctorName, setFilterDoctorName] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      await createAppointment({
        variables: { doctorId, appointmentDate, appointmentTime },
      });
      setDoctorId("");
      setAppointmentDate("");
      setAppointmentTime("");
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating appointment:", err.message);
    }
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctorsData?.doctors.find((doc) => doc.id === doctorId);
    return doctor ? `${doctor.firstname} ${doctor.lastname}` : "Unknown Doctor";
  };

  const filteredAppointments = appointmentsData?.appointments.filter(
    (appointment) => {
      const doctorName = getDoctorName(appointment.doctorId).toLowerCase();
      const filterNameLower = filterDoctorName.toLowerCase();
      const appointmentDateMatches =
        !filterDate || appointment.appointmentDate === filterDate;
      const doctorNameMatches =
        !filterDoctorName || doctorName.includes(filterNameLower);

      return doctorNameMatches && appointmentDateMatches;
    }
  );

  if (doctorsLoading) return <p>Loading doctors...</p>;
  if (doctorsError) return <p>Error : {doctorsError.message}</p>;

  if (appointmentsLoading) return <p>Loading appointments...</p>;
  if (appointmentsError) return <p>Error : {appointmentsError.message}</p>;

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <h2>Appointment Dashboard</h2>
        <Button variant="success" onClick={handleShowCreateModal}>
          Create Appointment
        </Button>
        <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitCreate}>
              <div className="form-group">
                <label htmlFor="doctor">Doctor</label>
                <select
                  id="doctor"
                  className="form-control"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctorsData.doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstname} {doctor.lastname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  className="form-control"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                >
                  <option value="">Select Time</option>
                  {[
                    "09:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "01:00 PM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="primary" type="submit">
                Create Appointment
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        <h3 className="mt-4">Filter Appointments</h3>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Filter by doctor name"
              className="form-control mb-2"
              value={filterDoctorName}
              onChange={(e) => setFilterDoctorName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control mb-2"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>

        <h3 className="mt-4">Appointments List</h3>
        {filteredAppointments.length === 0 ? (
          <p>No appointments available</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{getDoctorName(appointment.doctorId)}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CreateAppointment;
