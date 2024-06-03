import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Stylesheet/Menu.css";

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
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
