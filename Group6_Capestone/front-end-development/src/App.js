import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import UserLanding from "./pages/User/UserLanding";
import AdministrationLanding from "./pages/Administration/AdministrationLanding";
import AdministrationLogin from "./pages/Administration/AdministrationLogin";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import DoctorDashboard from "./pages/Administration/Doctor/DoctorDashboard";
import AdminDashboard from "./pages/Administration/Admin/AdminDashboard";
import AppointmentDetail from "./pages/Administration/Doctor/appointmentDetail";
import "./App.css";
import UserDashboard from "./pages/User/UserDashboard";
import BookAppointment from "./pages/User/BookAppointment";
import DoctorsList from "./pages/Administration/Admin/DoctorsList";
import PatientsList from "./pages/Administration/Admin/PatientsList";
import CreateAppointment from "./pages/Administration/Admin/CreateAppointment";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<UserLanding />} />
        <Route
          path="/healthease-administration-landing-page"
          element={<AdministrationLanding />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/administrationLogin" element={<AdministrationLogin />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/doctorsList" element={<DoctorsList />}></Route>
        <Route path="/patientsList" element={<PatientsList />}></Route>
        <Route path="/appointmentDetail/:id" element={<AppointmentDetail />} />
        <Route path="/bookAppointments" element={<BookAppointment />} />
        <Route path="/createAppointment" element={<CreateAppointment />} />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;
