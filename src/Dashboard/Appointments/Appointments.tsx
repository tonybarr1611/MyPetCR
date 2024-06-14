import { SetStateAction, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Modal,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { PlusLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
    {
      id: 1,
      owner: "<Tony",
      pet: "Buddy",
      veterinary: 123,
      store: "Pet Store 1",
      status: "Pending",
      dateTime: "2024-06-15 10:00 AM",
    },
  ]);

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.error("Search field is required", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleAddAppointment = () => {
    navigate("registerappointment");
  };

  const handleEditAppointment = (id: number) => {
    navigate("editappointment/");
  };

  return (
    <div>
      <Container fluid>
        <ToastContainer />
        <Row className="mt-3">
          <Col md={{ span: 2.5 }} className="d-flex justify-content-center ">
            <div className="mb-3 sticky-card" style={{ width: "80%" }}>
              <Card style={{ background: "#C9E5F0" }}>
                <Card.Body>
                  <Card.Title>Filter Appointments</Card.Title>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>By Date</Form.Label>
                      <Form.Control type="date" name="date" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>By Status</Form.Label>
                      <Form.Control as="select" name="status">
                        <option>All</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>By Store</Form.Label>
                      <Form.Control
                        type="text"
                        name="store"
                        placeholder="Store Name"
                      />
                    </Form.Group>
                    <Button variant="primary" type="button" className="w-100">
                      Apply Filters
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={10}>
            <Form onSubmit={handleSubmit} className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    name="search"
                    onChange={handleSearchChange}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    type="button"
                    className="me-2"
                    onClick={handleAddAppointment}
                  >
                    <PlusLg />
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="contain-table">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID Appointment</th>
                    <th>Owner</th>
                    <th>Pet</th>
                    <th>Veterinary</th>
                    <th>Store</th>
                    <th>Status</th>
                    <th>Date/Time</th>
                    <th colSpan={2} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.id}</td>
                      <td>{appointment.owner}</td>
                      <td>{appointment.pet}</td>
                      <td>{appointment.veterinary}</td>
                      <td>{appointment.store}</td>
                      <td>{appointment.status}</td>
                      <td>{appointment.dateTime}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="primary"
                            size="sm"
                            className=" mr-2"
                            onClick={() =>
                              handleEditAppointment(appointment.id)
                            }
                          >
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Appointments;