import { SetStateAction, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "../Pets.css";

const ClientAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      pet: "Buddy",
      veterinary: "Dr. Smith",
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 2,
      pet: "Buddy",
      veterinary: "Dr. Smith",
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 11:00 AM",
    },
    {
      id: 3,
      pet: "Buddy",
      veterinary: "Dr. Smith",
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 12:00 PM",
    }
  ]);

  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.error("Search field is required", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleRequestAppointment = () => {
    navigate("requestappointment");
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment
      )
    );
  };

  return (
    <Container fluid className="p-3">
      <Row>
        <Col>
          <h2>My Appointments</h2>
        </Col>
      </Row>
      <ToastContainer />
      <Row className="mb-3 mt-2">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  name="search"
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Appointment</th>
                <th>Pet</th>
                <th>Veterinary</th>
                <th>Store</th>
                <th>Status</th>
                <th>Date/Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter((appointment) =>
                  appointment.pet
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((appointment) => (
                  <tr key={appointment.id} className={appointment.status === "Cancelled" ? "whitened" : ""}>
                    <td>{appointment.id}</td>
                    <td>{appointment.pet}</td>
                    <td>{appointment.veterinary}</td>
                    <td>{appointment.store}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.dateTime}</td>
                    <td>
                      <div style={{display: "flex", justifyContent: "center"}}>
                        <Button
                          variant="danger"
                          onClick={() => handleCancelAppointment(appointment.id)}
                          disabled={appointment.status === "Cancelled"}>
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="text-center mt-3">
            <Button
              variant="primary"
              onClick={handleRequestAppointment}
            >
              <PlusCircleDotted className="mr-2"/> Request Appointment
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientAppointments;
