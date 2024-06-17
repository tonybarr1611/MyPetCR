import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { CalendarCheck, ClipboardData } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { guestRedirection } from "../../Commons/AuthCommons";

const ClientOptions = () => {
  const navigate = useNavigate();
  guestRedirection();

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Welcome to the Pet Management System</h1>
          <p>
            Manage your appointments and pets easily with the options below.
          </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          <Card className="mb-3" style={{ height: "100%" }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <CalendarCheck size={70} className="mb-3 text-primary" />
              <Card.Title>Appointment Management</Card.Title>
              <Card.Text className="text-center">
                Schedule, view, and manage your pet's appointments.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate("appointments")}
              >
                Go to Appointments
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3" style={{ height: "100%" }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <ClipboardData size={70} className="mb-3 text-success" />
              <Card.Title>Pet Management</Card.Title>
              <Card.Text className="text-center">
                Add and view information about your pets.
              </Card.Text>
              <Button
                variant="success"
                className="mt-4"
                onClick={() => navigate("pets")}
              >
                Go to Pet Management
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientOptions;
