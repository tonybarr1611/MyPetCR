import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SiDatadog } from "react-icons/si";
import 'react-toastify/dist/ReactToastify.css';

interface Pet {
  name: string;
}

interface Store {
  name: string;
}

const RequestAppointment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Log location state to troubleshoot
  console.log(location.state);

  const [appointment, setAppointment] = useState({
    clientName: location.state?.clientName || '',
    petName: "",
    store: "",
    dateTime: ""
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    // Fetch pets and stores data from backend or mock data for testing
    setPets([{ name: 'Buddy' }, { name: 'Bella' }]);
    setStores([{ name: 'Store A' }, { name: 'Store B' }]);
  }, []);

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (!appointment.petName || !appointment.store || !appointment.dateTime) {
        toast.error("All fields are required", { autoClose: 1500, theme: 'colored' });
      } else {

        toast.success("Appointment created successfully", { autoClose: 1500, theme: 'colored' });
        navigate('/clientside/management/appointments');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("An error occurred while creating the appointment", { autoClose: 1500, theme: 'colored' });
    }
  };

  const handleCancel = () => {
    navigate('/clientside/management/appointments');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <ToastContainer position="top-center" />
      <Card style={{ width: '36rem', background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <SiDatadog size={40} className="mb-3" style={{ color: 'var(--darkblue)' }} />
            <h1 className="h4">Create Appointment</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPetName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control as="select" name="petName" value={appointment.petName} onChange={handleOnChange}>
                <option value="">Select Pet</option>
                {pets.map((pet, index) => (
                  <option key={index} value={pet.name}>{pet.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStore">
              <Form.Label>Store</Form.Label>
              <Form.Control as="select" name="store" value={appointment.store} onChange={handleOnChange}>
                <option value="">Select Store</option>
                {stores.map((store, index) => (
                  <option key={index} value={store.name}>{store.name}</option>
                ))}
              </Form.Control>
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

export default RequestAppointment;
