import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuStyle = {
  backgroundColor: "#333",
  overflow: "hidden",
};

const ulStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "flex-end",
};

const liStyle = {
  display: "inline",
  marginLeft: "1%",
  marginRight: "1%",
};

const linkStyle = {
  display: "block",
  color: "white",
  textAlign: "center",
  padding: "14px 16px",
  textDecoration: "none",
};

const linkHoverStyle = {
  backgroundColor: "#111",
};

const Menu = () => {
  const [hoverIndex, setHoverIndex] = React.useState(null);
  const location = useLocation();

  const isUserPage = location.pathname === "/";
  const isAdminOrDoctorPage =
    location.pathname === "/healthease-administration-landing-page";

  return (
    <nav style={menuStyle}>
      <ul style={ulStyle}>
        {isUserPage && (
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
        )}
        {isAdminOrDoctorPage && (
          <>
            <li style={liStyle}>
              <Link
                to="/administrationLogin"
                style={
                  hoverIndex === 1
                    ? { ...linkStyle, ...linkHoverStyle }
                    : linkStyle
                }
                onMouseEnter={() => setHoverIndex(1)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
