import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaDog, FaCircleUser } from "react-icons/fa6"; // Importing the UserCircle icon
import { Link } from "react-router-dom";

function NavBar() {
  const handleLogOut = () => {
    window.location.assign("/");
  };

  return (
    <Navbar bg="light" expand="lg" style={{ width: "100%" }}>
      <Container>
        <Link to={"/dashboard"}>
          <Navbar.Brand>
            <FaDog
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            {"    "}Dashboard
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/dashboard/clients"} className="nav-link">
              Clients
            </Link>
            <Link to={"/dashboard/appointments"} className="nav-link">
              Appointments
            </Link>
            {parseInt(localStorage.getItem("userType") || "3") < 3 && (
              <Link to={"/dashboard/management"} className="nav-link">
                Management
              </Link>
            )}
            <Link to={"/dashboard/medicalfiles"} className="nav-link">
              Medical files
            </Link>
            <Link to={"/dashboard/products"} className="nav-link">
              Products
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown title={<FaCircleUser size={24} />}>
              <NavDropdown.Item onClick={handleLogOut}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
