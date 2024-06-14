import { Container, Nav, Navbar } from "react-bootstrap";
import { FaDog } from "react-icons/fa6";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" style={{ width: "100%" }}>
      <Container>
        <Navbar.Brand href="/dashboard">
          <FaDog
            size={40}
            className="mb-3"
            style={{ color: "var(--darkblue)" }}
          />
          {"    "}Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/dashboard/clients"}>
              <Nav.Link href="dashboard/clients">
                <Link to={"/dashboard/clients"}>Clients</Link>
              </Nav.Link>
            </Link>
            <Link to={"/dashboard/clients"}>
              <Nav.Link href="dashboard/appointments">
                <Link to={"/dashboard/appointments"}>Appointments</Link>
              </Nav.Link>
            </Link>
            <Link to={"/dashboard/management"}>
              <Nav.Link href="dashboard/management">
                <Link to={"/dashboard/management"}>Management</Link>
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
