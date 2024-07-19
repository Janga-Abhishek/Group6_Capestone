import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Stylesheet/Menu.css";
import "bootstrap/dist/css/bootstrap.min.css";

const linkStyle = {
  display: "block",
  color: "white",
  textAlign: "center",
  textDecoration: "none",
  padding: "10px",
};

const linkHoverStyle = {
  backgroundColor: "#0a71b5",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  transform: "scale(1.1) translateY(-5px)",
  borderRadius: "8px",
};

const Menu = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hasShadow, setHasShadow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const location = useLocation();

  const isUserLandingPage = location.pathname === "/";
  const isAdministrationLandingPage =
    location.pathname === "/healthease-administration-landing-page";
  const isLogin = location.pathname === "/Login";
  const isRegister = location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedUserType = sessionStorage.getItem("userType");

    console.log("Stored Username:", storedUsername);
    console.log("Stored User Type:", storedUserType);

    if (storedUsername) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const handleLogout = () => {
    if (userType === "patient") {
      window.location.href = "/";
    } else if (userType === "admin") {
      window.location.href = "/administrationLogin";
    } else if (userType === "doctor") {
      window.location.href = "/administrationLogin";
    }
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userType");
    setIsLoggedIn(false);
  };

  return (
    <div className="containerStyle">
      <nav className={`menuStyle ${hasShadow ? "hasShadow" : ""}`}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
          }}
        >
          <img
            src="/images/HealthEase_logo.png"
            alt="Logo"
            style={{
              height: "60px",
              width: "auto",
              border: "1px solid black",
              borderRadius: "35px",
              marginRight: "10px",
            }}
          />
          <h1 style={{ margin: 0, fontSize: "24px" }}>HealthEase</h1>
        </Link>
        <ul className="ulStyle">
          {isLoggedIn ? (
            <>
              {userType === "patient" && (
                <>
                  <li className="liStyle">
                    <Link
                      to="/bookAppointments"
                      style={
                        hoverIndex === 0
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(0)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Appointments
                    </Link>
                  </li>
                  <li className="liStyle">
                    <Link
                      to="/uploadPrescription"
                      style={
                        hoverIndex === 1
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(1)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Upload Prescription
                    </Link>
                  </li>
                  <li className="liStyle">
                    <Link
                      to="/medical_records"
                      style={
                        hoverIndex === 2
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(2)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Medical Records
                    </Link>
                  </li>
                </>
              )}
              {userType === "admin" && (
                <>
                  <li className="liStyle">
                    <Link
                      to="/doctorsList"
                      style={
                        hoverIndex === 3
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(3)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Doctors
                    </Link>
                  </li>
                  <li className="liStyle">
                    <Link
                      to="/patientsList"
                      style={
                        hoverIndex === 4
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(4)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Patients
                    </Link>
                  </li>
                  <li className="liStyle">
                    <Link
                      to="/createAppointment"
                      style={
                        hoverIndex === 5
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(5)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Appointments
                    </Link>
                  </li>

                  <li className="liStyle">
                    <Link
                      to="/registerDepartment"
                      style={
                        hoverIndex === 6
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(6)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Add Department
                    </Link>
                  </li>
                </>
              )}
              <li className="liStyle">
                <button
                  onClick={handleLogout}
                  style={{
                    ...linkStyle,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoverIndex(6)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <span style={hoverIndex === 6 ? linkHoverStyle : undefined}>
                    Logout
                  </span>
                </button>
              </li>
            </>
          ) : (
            <>
              {isUserLandingPage && (
                <>
                  <li className="liStyle">
                    <Link
                      to="/Login"
                      style={
                        hoverIndex === 0
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(0)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="liStyle">
                    <Link
                      to="/register"
                      style={
                        hoverIndex === 1
                          ? { ...linkStyle, ...linkHoverStyle }
                          : linkStyle
                      }
                      onMouseEnter={() => setHoverIndex(1)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {isAdministrationLandingPage && (
                <li className="liStyle">
                  <Link
                    to="/administrationLogin"
                    style={
                      hoverIndex === 2
                        ? { ...linkStyle, ...linkHoverStyle }
                        : linkStyle
                    }
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    Login
                  </Link>
                </li>
              )}
              {isLogin && (
                <li className="liStyle">
                  <Link
                    to="/register"
                    style={
                      hoverIndex === 2
                        ? { ...linkStyle, ...linkHoverStyle }
                        : linkStyle
                    }
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    Register
                  </Link>
                </li>
              )}
              {isRegister && (
                <li className="liStyle">
                  <Link
                    to="/login"
                    style={
                      hoverIndex === 2
                        ? { ...linkStyle, ...linkHoverStyle }
                        : linkStyle
                    }
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
