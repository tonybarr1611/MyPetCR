import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaDog, FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" style={{ width: "100%" }}>
      <Container>
        <Link to={"/clientside"}>
          <Navbar.Brand>
            <FaDog
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            {"    "}MyPetCR
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/clientside/shop"} className="nav-link">
              Shop
            </Link>
            <Link to={"/clientside/management"} className="nav-link">
              Pet Management
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link to={"/clientside/cart"} className="nav-link mr-2">
              <FaCartShopping size={24} />
            </Link>
            <NavDropdown title={<FaCircleUser size={24} />}>
              <NavDropdown.Item><Link to={"/clientside/profile"}>Profile</Link></NavDropdown.Item>
              <NavDropdown.Item>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
