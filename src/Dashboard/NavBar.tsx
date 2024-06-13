import { Container, Nav, Navbar } from "react-bootstrap";
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
            <Nav.Link href="clients">Clients</Nav.Link>
            <Nav.Link href="appointments">Appointments</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
