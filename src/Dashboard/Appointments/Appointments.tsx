import { useState, useEffect, SetStateAction } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { PlusLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import AppointmentsDetail from "./AppointmentsData";
import logger from "../../log";

const Appointments = () => {
  guestRedirection();
  handleExpiration();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("All");
  const [store, setStore] = useState("");
  const [appointments, setAppointments] = useState<
    {
      id: number;
      owner: string;
      pet: string;
      veterinary: string;
      store: string;
      status: string;
      dateTime: string;
    }[]
  >([]);
  const formatDate = (date: any) => {
    return `${date.slice(0, 10)} ${date.slice(11, 16)}`;
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/appointment/`
        );
        const newList = response.data.map((obj: any) => ({
          id: obj.IDAppointment,
          owner: obj.ClientName,
          pet: obj.PetName,
          veterinary: obj.EmployeeName,
          store: obj.StoreLocation,
          status: obj.StatusName,
          dateTime: formatDate(obj.DateTime),
        }));
        setAppointments(newList);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchAppointments();
  }, []);

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
    logger.request(`The user has requested to add a appointment`);
    navigate("registerappointment");
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
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>By Status</Form.Label>
                      <Form.Control
                        as="select"
                        name="status"
                        id="statusForm"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value={"All"}>All</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Confirmed"}>Confirmed</option>
                        <option value={"Completed"}>Completed</option>
                        <option value={"Cancelled"}>Cancelled</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>By Store</Form.Label>
                      <Form.Control
                        type="text"
                        name="store"
                        placeholder="Store Name"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                      />
                    </Form.Group>
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
                  {appointments
                    .filter((appointment) => {
                      if (searchTerm === "") {
                        return appointment;
                      } else if (
                        appointment.owner
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        appointment.pet
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        appointment.veterinary
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        appointment.store
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        appointment.status
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        appointment.dateTime
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return appointment;
                      }
                    })
                    .filter((appointment) => {
                      if (status === "All") {
                        return appointment;
                      } else if (appointment.status === status) {
                        return appointment;
                      }
                    })
                    .filter((appointment) => {
                      if (store === "") {
                        return appointment;
                      } else if (
                        appointment.store
                          .toLowerCase()
                          .includes(store.toLowerCase())
                      ) {
                        return appointment;
                      }
                    })
                    .filter((appointment) => {
                      if (startDate === "" && endDate === "") {
                        return appointment;
                      } else if (
                        appointment.dateTime >= startDate &&
                        appointment.dateTime <= endDate
                      ) {
                        return appointment;
                      }
                    })
                    .map((appointment) => (
                      <AppointmentsDetail
                        key={appointment.id}
                        appointment={appointment}
                      />
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
