import { Container, Row, Col, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const AccessDenied_SignIn = () => {
  const navigate = useNavigate();


  return (
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <ExclamationTriangleFill size={80} className="text-danger mb-4" />
          <h1>Oops!</h1>
          <h3>To access this area, you must be signed in.</h3>
          <p>Please log in to continue.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go to Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied_SignIn;