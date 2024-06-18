import { Container, Row, Col, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();


  return (
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <ExclamationTriangleFill size={80} className="text-danger mb-4" />
          <h1>Oops!</h1>
          <h3>This area is restricted to certain users.</h3>
          <p>Please head back to the home page.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go to Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied;
