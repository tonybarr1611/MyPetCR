import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SiDatadog } from "react-icons/si";

const RegisterAppointment = () => {
  const [appointment, setAppointment] = useState({ clientName: "", petName: "", personnelName: "", store: "", dateTime: "" });
  const navigate = useNavigate();

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (!appointment.clientName || !appointment.petName || !appointment.personnelName || !appointment.store || !appointment.dateTime) {
        toast.error("All fields are required", { autoClose: 1500, theme: 'colored' });
      } else {
        // Backend request logic to add the appointment using appointment data
        toast.success("Appointment created successfully", { autoClose: 1500, theme: 'colored' });
        navigate('/dashboard/appointments');
      }
    } catch (error) {
      toast.error("An error occurred while creating the appointment", { autoClose: 1500, theme: 'colored' });
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/appointments'); // Navigate back to the appointments list or dashboard
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer position="top-center" />
      <Card style={{ width: '24rem', background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <SiDatadog size={40} className="mb-3" style={{ color: 'var(--darkblue)' }} />
            <h1 className="h4">Create Appointment</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formClientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                name="clientName"
                value={appointment.clientName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPetName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                name="petName"
                value={appointment.petName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPersonnelName">
              <Form.Label>Personnel Name</Form.Label>
              <Form.Control
                type="text"
                name="personnelName"
                value={appointment.personnelName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStore">
              <Form.Label>Store</Form.Label>
              <Form.Control
                type="text"
                name="store"
                value={appointment.store}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateTime">
              <Form.Label>Date/Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dateTime"
                value={appointment.dateTime}
                onChange={handleOnChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Create Appointment
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

export default RegisterAppointment;
