import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditInvoiceDetail = () => {
  const { detailId } = useParams();
  const navigate = useNavigate();

  // Sample data, you can replace this with an API call to fetch the detail
  const [detail, setDetail] = useState({
    id: detailId,
    product: 1001,
    description: 'Rabies Vaccine',
    quantity: 1,
    price: 50.00,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission, such as making an API call to save changes
    navigate(`/medicalfiledetails/${detail.id}`);
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <h2>Edit Invoice Detail</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProduct">
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                name="product"
                value={detail.product}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={detail.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={detail.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditInvoiceDetail;
