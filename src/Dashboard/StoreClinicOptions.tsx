import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Shop, Hospital } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { guestRedirection, handleExpiration } from "../Commons/AuthCommons";

const ClientOptions = () => {
  guestRedirection();
  handleExpiration();
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Welcome to MyPetCR</h1>
          <p>
            Choose an option below to proceed to the Store or Clinic Dashboard.
          </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          <Card className="mb-3" style={{ height: "100%" }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <Shop size={70} className="mb-3 text-primary" />
              <Card.Title>Store</Card.Title>
              <Card.Text className="text-center">
                Browse products and view personal profile in the store.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/clientside")}>
                Go to Store
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3" style={{ height: "100%" }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <Hospital size={70} className="mb-3 text-success mt-1" />
              <Card.Title className="mt-3">Welcome to Clinic Dashboard</Card.Title>
              <Card.Text className="text-center mt-4">
                Here you can access and manage several clinic operations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientOptions;
