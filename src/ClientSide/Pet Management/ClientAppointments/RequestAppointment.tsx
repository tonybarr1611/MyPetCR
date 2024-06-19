import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SiDatadog } from "react-icons/si";
import axios from 'axios';
import { getClientID } from '../../Functions';
import logger from '../../../log';

interface Pet {
  IDPet: number;
  PetName: string;
}

interface Store {
  IDStore: number;
  Location: string;
}

const RequestAppointment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    IDClient: "",
    IDPet: "",
    IDStore: "",
    DateTime: "",
    IDEmployee: 1,

  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchPetsAndStores = async () => {
      try {
        const clientId = getClientID();
        if (!clientId) {
          toast.error("Client ID is missing", { autoClose: 1500, theme: 'colored' });
          return;
        }

        const petResponse = await axios.get(`http://localhost:8080/api/v1/petByClient/${clientId}`);
        setPets(petResponse.data);

        const storeResponse = await axios.get('http://localhost:8080/api/v1/store');
        setStores(storeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data", { autoClose: 1500, theme: 'colored' });
      }
    };

    fetchPetsAndStores();
  }, [location.state]);

  const handleOnChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (!appointment.IDPet || !appointment.IDStore || !appointment.DateTime) {
        toast.error("All fields are required", { autoClose: 1500, theme: 'colored' });
      } else {
        const appointmentData = {
          ...appointment,
        };
        appointmentData.IDClient = getClientID();

        console.log(appointmentData);
        await axios.post('http://localhost:8080/api/v1/appointmentandinvoice', appointmentData);
        logger.request('User has requested an appointment for pet with ID ' + appointmentData.IDPet + ' at store with ID ' + appointmentData.IDStore + ' at date/time ' + appointmentData.DateTime);

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
              <Form.Control as="select" name="IDPet" value={appointment.IDPet} onChange={handleOnChange}>
                <option value="">Select Pet</option>
                {pets.map((pet) => (
                  <option key={pet.IDPet} value={pet.IDPet}>{pet.PetName}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStore">
              <Form.Label>Store</Form.Label>
              <Form.Control as="select" name="IDStore" value={appointment.IDStore} onChange={handleOnChange}>
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option key={store.IDStore} value={store.IDStore}>{store.Location}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateTime">
              <Form.Label>Date/Time</Form.Label>
              <Form.Control
                type="DateTime-local"
                name="DateTime"
                value={appointment.DateTime}
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