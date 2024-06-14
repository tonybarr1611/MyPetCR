import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SiDatadog } from "react-icons/si";

interface Personnel {
  id: number;
  name: string;
  phoneNumber: number;
}

interface Pet {
  name: string;
}

interface Store {
  name: string;
}

const RegisterAppointmentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    clientName: location.state.clientName,
    petName: "",
    personnelId: "",
    store: "",
    dateTime: ""
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [showPersonnelTable, setShowPersonnelTable] = useState(false);

  useEffect(() => {
    // Fetch pets, personnel, and stores data from backend
    setPets([{ name: 'Buddy' }, { name: 'Bella' }]); // Example data
    setPersonnel([{ id: 1, name: 'Dr. Smith', phoneNumber: 1234567890 }, { id: 2, name: 'Dr. Doe', phoneNumber: 9876543210 }]); // Example data
    setStores([{ name: 'Store A' }, { name: 'Store B' }]); // Example data
  }, []);

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!appointment.petName || !appointment.personnelId || !appointment.store || !appointment.dateTime) {
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

  const togglePersonnelTable = () => {
    setShowPersonnelTable(!showPersonnelTable);
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
            <Form.Group className="mb-3" controlId="formPersonnelId">
              <Form.Label>Personnel ID</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  name="personnelId"
                  value={appointment.personnelId}
                  onChange={handleOnChange}
                  min="1"
                />
                <Button variant="info" onClick={togglePersonnelTable} className="ml-2" style={{ width: '40%' }}>
                  {showPersonnelTable ? 'Hide Personnel' : 'Show Personnel'}
                </Button>
              </div>
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
      {showPersonnelTable && (
        <div style={{ marginLeft: '20px' }}>
          <div className="scrollableDiv datatable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {personnel.map((person, index) => (
                  <tr key={index} onClick={() => setAppointment({ ...appointment, personnelId: person.id.toString() })}>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RegisterAppointmentDetails;
