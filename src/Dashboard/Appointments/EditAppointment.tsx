import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { SiDatadog } from "react-icons/si";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import axios from "axios";
import logger from "../../log";
import { getIDUser } from "../../ClientSide/Functions";

let LastIDEmployee = 0;
let LastIDStatus = 0;

interface Personnel {
  id: number;
  name: string;
  phoneNumber: number;
  usertype: number;
  IDUser: number;
}

interface Pet {
  id: number;
  name: string;
}

interface Store {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

const EditAppointment: React.FC = () => {
  const [appointment, setAppointment] = useState({
    petName: "",
    personnelId: "",
    store: "",
    dateTime: "",
    status: "Pending",
    idEmployee: 0,
    clientid: 0,
    idPet: 0,
    idStore: 0,
    idStatus: 0,
    iduserEmployee: 0,
  });
  const [originalAppointment, setOriginalAppointment] = useState(appointment);
  guestRedirection();
  handleExpiration();
  const [pets, setPets] = useState<Pet[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [showPersonnelTable, setShowPersonnelTable] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;

  const formatDate = (date: any) => {
    return `${date.slice(0, 10)}T${date.slice(11, 16)}`;
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const appoointmentResponse = await axios.get(
          `http://localhost:8080/api/v1/appointment/${id}`
        );
        setAppointment({
          petName: appoointmentResponse.data[0].PetName,
          personnelId: appoointmentResponse.data[0].IDEmployee,
          store: appoointmentResponse.data[0].StoreLocation,
          dateTime: formatDate(appoointmentResponse.data[0].DateTime),
          idEmployee: appoointmentResponse.data[0].IDEmployee,
          status: appoointmentResponse.data[0].StatusName,
          clientid: appoointmentResponse.data[0].ClientUserID,
          iduserEmployee: appoointmentResponse.data[0].IDUser,
          idPet: appoointmentResponse.data[0].IDPet,
          idStore: appoointmentResponse.data[0].IDStore,
          idStatus: appoointmentResponse.data[0].IDStatus,
        });
        setOriginalAppointment({
          petName: appoointmentResponse.data[0].PetName,
          personnelId: appoointmentResponse.data[0].IDEmployee,
          store: appoointmentResponse.data[0].StoreLocation,
          dateTime: formatDate(appoointmentResponse.data[0].DateTime),
          status: appoointmentResponse.data[0].StatusName,
          clientid: appoointmentResponse.data[0].ClientUserID,
          idEmployee: appoointmentResponse.data[0].IDEmployee,
          iduserEmployee: appoointmentResponse.data[0].IDUser,
          idPet: appoointmentResponse.data[0].IDPet,
          idStore: appoointmentResponse.data[0].IDStore,
          idStatus: appoointmentResponse.data[0].IDStatus,
        });
        LastIDEmployee = appoointmentResponse.data[0].IDEmployee;
        LastIDStatus = appoointmentResponse.data[0].IDStatus;
        const petResponse = await axios.get(
          `http://localhost:8080/api/v1/petByClient/${appoointmentResponse.data[0].IDClient}`
        );
        const petList = petResponse.data.map((obj: any) => ({
          id: obj.IDPet,
          name: obj.PetName,
        }));
        setPets(petList);

        const personnelResponse = await axios.get(
          `http://localhost:8080/api/v1/employee/`
        );
        const personnelList = personnelResponse.data.map((obj: any) => ({
          id: obj.IDEmployee,
          name: obj.Name,
          phoneNumber: obj.PhoneNumber,
          usertype: obj.IDUserType,
          IDUser: obj.IDUser,
        }));
        setPersonnel(personnelList);

        const storeResponse = await axios.get(
          `http://localhost:8080/api/v1/store/`
        );
        const storelList = storeResponse.data.map((obj: any) => ({
          id: obj.IDStore,
          name: obj.Location,
        }));
        setStores(storelList);

        const statusResponse = await axios.get(
          `http://localhost:8080/api/v1/status/`
        );
        const statuslList = statusResponse.data.map((obj: any) => ({
          id: obj.IDStatus,
          name: obj.Name,
        }));
        setStatus(statuslList);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to fetch clients", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchClient();
  }, []);

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    if (e.target.name === "petName") {
      const selectedPetId = e.target.selectedOptions[0].getAttribute("data-id");
      setAppointment({
        ...appointment,
        idPet: selectedPetId,
        petName: e.target.value,
      });
    } else if (e.target.name === "store") {
      const selectedStoreId =
        e.target.selectedOptions[0].getAttribute("data-id");
      setAppointment({
        ...appointment,
        idStore: selectedStoreId,
        store: e.target.value,
      });
    } else if (e.target.name === "status") {
      const selectedStatusId =
        e.target.selectedOptions[0].getAttribute("data-id");
      setAppointment({
        ...appointment,
        idStatus: selectedStatusId,
        status: e.target.value,
      });
    } else {
      setAppointment({ ...appointment, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (
        !appointment.petName ||
        !appointment.personnelId ||
        !appointment.store ||
        !appointment.dateTime ||
        !appointment.status
      ) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (new Date(appointment.dateTime) < new Date()) {
        toast.error("Date/Time must be in the future", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        try {
          const url = `http://localhost:8080/api/v1/appointment/${id}`;
          const param = {
            IDPet: appointment.idPet,
            IDEmployee: appointment.personnelId,
            IDStore: appointment.idStore,
            IDStatus: appointment.idStatus,
            DateTime: appointment.dateTime,
            IDUser: appointment.iduserEmployee,
          };

          console.log("new", param.IDStatus);
          console.log("original", originalAppointment.idStatus);

          if (param.IDStatus === "3") {
            console.log(
              personnel.reduce(
                (acc, curr) =>
                  curr.id === originalAppointment.idEmployee
                    ? curr.IDUser
                    : acc,
                0
              )
            );
            await axios.post(
              `http://localhost:8080/api/v1/send-email/${personnel.reduce(
                (acc, curr) =>
                  curr.id === originalAppointment.idEmployee
                    ? curr.IDUser
                    : acc,
                0
              )}/4`
            );
          }
          if (originalAppointment.idEmployee !== parseInt(param.IDEmployee)) {
            console.log(
              personnel.reduce(
                (acc, curr) =>
                  curr.id === parseInt(param.IDEmployee) ? curr.IDUser : acc,
                0
              )
            );
            await axios.post(
              `http://localhost:8080/api/v1/send-email/${personnel.reduce(
                (acc, curr) =>
                  curr.id === parseInt(param.IDEmployee) ? curr.IDUser : acc,
                0
              )}/3`
            );
          }
          await axios.put(url, param);
        } catch (error) {
          toast.error("Failed to update client", {
            autoClose: 1500,
            theme: "colored",
          });
        }
        toast.success("Appointment updated successfully", {
          autoClose: 1500,
          theme: "colored",
        });
        logger.request(`the user has edited the appointment ID: ${id}`);
        navigate("/dashboard/appointments");
      }
    } catch (error) {
      toast.error("An error occurred while updating the appointment", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/appointments");
  };

  const togglePersonnelTable = () => {
    setShowPersonnelTable(!showPersonnelTable);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer position="top-center" />
      <Card style={{ width: "36rem", background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <SiDatadog
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1 className="h4">Edit Appointment</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPetName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                as="select"
                name="petName"
                value={appointment.petName}
                onChange={handleOnChange}
              >
                <option value="">Select Pet</option>
                {pets.map((pet) => (
                  <option value={pet.name} data-id={pet.id}>
                    {pet.name}
                  </option>
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
                <Button
                  variant="info"
                  onClick={togglePersonnelTable}
                  className="ml-2"
                  style={{ width: "40%" }}
                >
                  {showPersonnelTable ? "Hide Personnel" : "Show Personnel"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStore">
              <Form.Label>Store</Form.Label>
              <Form.Control
                as="select"
                name="store"
                value={appointment.store}
                onChange={handleOnChange}
              >
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option value={store.name} data-id={store.id}>
                    {store.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={appointment.status}
                onChange={handleOnChange}
              >
                {status.map((status_item) => (
                  <option value={status_item.name} data-id={status_item.id}>
                    {status_item.name}
                  </option>
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
                Update Appointment
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="mb-3"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {showPersonnelTable && (
        <div style={{ marginLeft: "20px" }}>
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
                {personnel.map((person, index) =>
                  person.usertype === 3 ? (
                    <tr
                      key={index}
                      onClick={() =>
                        setAppointment({
                          ...appointment,
                          personnelId: person.id.toString(),
                        })
                      }
                    >
                      <td>{person.id}</td>
                      <td>{person.name}</td>
                      <td>{person.phoneNumber}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default EditAppointment;
