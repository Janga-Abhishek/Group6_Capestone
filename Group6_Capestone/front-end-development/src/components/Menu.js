import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const containerStyle = {
  paddingTop: "50px",
};
const menuStyle = {
  backgroundColor: "#1192DC",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  position: "fixed",
  width: "100%",
  top: 0,
  boxSizing: "border-box",
  transition: "box-shadow 0.3s ease",
};

const ulStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
};

const liStyle = {
  marginLeft: "10px",
};

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

  const isUserPage = location.pathname === "/";
  const isAdministrationPage =
    location.pathname === "/healthease-administration-landing-page";

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
    <div style={containerStyle}>
      <nav
        style={{
          ...menuStyle,
          boxShadow: hasShadow ? "0 8px 16px rgba(0, 0, 0, 0.3)" : "none",
        }}
      >
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
        <ul style={ulStyle}>
          {isUserPage && (
            <>
              <li style={liStyle}>
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
              <li style={liStyle}>
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
          {isAdministrationPage && (
            <li style={liStyle}>
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
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
