import { SetStateAction, useEffect, useState } from "react";
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
import axios from "axios";
import {getClientID} from "../../Functions";

const ClientAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const formatDate = (date: string | any[]) => {
    return `${date.slice(0, 10)} ${date.slice(11, 16)}`;
  };

  interface Appointment {
    id: number;
    pet: string;
    veterinary: string;
    store: string;
    status: string;
    dateTime: string;
    IDUser: number;
  }

  
  const clientid = getClientID();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointment/client/${clientid}`);
        const appointmentlist = response.data.map((obj: any) => ({
          id: obj.IDAppointment,
          pet: obj.PetName,
          veterinary: obj.EmployeeName,
          IDUser: obj.IDUser,
          store: obj.StoreLocation,
          status: obj.StatusName,
          dateTime: formatDate(obj.DateTime),
        }));
        setAppointments(appointmentlist);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
        toast.error("Error fetching appointments", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchAppointments();
  }, []);

  const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
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

  const handleRequestAppointment = () => {
    navigate("requestappointment");
  };

  const handleCancelAppointment = async (id: number) => {

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment
      )
    );
    try {
      const url = `http://localhost:8080/api/v1/appointment/${id}`;
      const params = { IDStatus: "3" }; 
      await axios.put(url, params);
      const appointment = appointments.find((appointment) => appointment.id === id);
      await axios.post(`http://localhost:8080/api/v1/send-email/${appointment?.IDUser}/4`);
      toast.error("Appointment cancelled successfully", {
        autoClose: 1500,
        theme: "colored",  
      });
    
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment", {
        autoClose: 1500,
        theme: "colored",
      });

      // Optionally revert the state change if the API call fails
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "Active" } : appointment
        )
      );
    }
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
                      <div style={{ display: "flex", justifyContent: "center" }}>
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
              <PlusCircleDotted className="mr-2" /> Request Appointment
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientAppointments;
