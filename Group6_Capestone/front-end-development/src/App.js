import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLanding from "./pages/User/UserLanding";
import AdministrationLanding from "./pages/Administration/AdministrationLanding";
import AdministrationLogin from "./pages/Administration/AdministrationLogin";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";

import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserLanding />} />
      <Route
        path="/healthease-administration-landing-page"
        element={<AdministrationLanding />}
      />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/administrationLogin" element={<AdministrationLogin />} />
    </Routes>
  </Router>
);

export default App;
