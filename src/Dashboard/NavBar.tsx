import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaDog } from "react-icons/fa6";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" style={{ width: "100%"}}>
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
            <NavDropdown title="Clients" id="basic-nav-dropdown">
              <NavDropdown.Item href="dashboard/clients">
                Add Client
              </NavDropdown.Item>
              <NavDropdown.Item href="dashboard/clients">
                View Clients
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Appointments" id="basic-nav-dropdown">
              <NavDropdown.Item href="dashboard/appointments">
                Add Appointment
              </NavDropdown.Item>
              <NavDropdown.Item href="dashboard/appointments">
                View Appointments
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
