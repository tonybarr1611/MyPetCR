import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { MdVaccines } from "react-icons/md";
import { ToastContainer ,toast } from 'react-toastify';

const MedicalFileAppointmentEdit = () => {
  const { detailId } = useParams();
  const navigate = useNavigate();

  
  const [detail, setDetail] = useState({
    id: detailId,
    product: 1001,
    description: 'Rabies Vaccine',
    quantity: 1,
    price: 50.00,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
        if (!detail.description || !detail.quantity) {
      toast.error("Please fill in all fields", { autoClose: 2000, theme: 'colored' });
        } else{
        toast.success("Detail updated successfully", { autoClose: 2000, theme: 'colored' });
        navigate(`/dashboard/medicalfiles/medicalfileinfo/medicalfiledetails`);
      }
    }   catch (error) {
        toast.error("Failed to update detail", { autoClose: 2000, theme: 'colored' });
        }
  };

  const handleCancel = () => {
    navigate(`/dashboard/medicalfiles/medicalfileinfo/medicalfiledetails`);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <ToastContainer position="top-center" />
      <Card style={{ width: '24rem', background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <MdVaccines size={40} className="mb-3" style={{ color: 'var(--darkblue)' }} />
            <h1 className="h4">Edit Invoice Detail</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={detail.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Update Detail
              </Button>
              <Button variant="secondary" type="button" className="mb-3" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MedicalFileAppointmentEdit;
