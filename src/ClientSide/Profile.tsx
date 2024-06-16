import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCircleUser } from 'react-icons/fa6';

const Profile = () => {

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890"
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <Card style={{background: "#C9E5F0"}}>
            <Card.Body className="text-center">
              <Card.Title className="mb-4">Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {user.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {user.phone}
              </Card.Text>
              <FaCircleUser size={40} className="text-primary" />
              <Card.Text className="mt-4" style={{ fontSize: "small", color: "grey" }}>
                If you need to change your information, please contact one of our clinics through message, call, or in person.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
