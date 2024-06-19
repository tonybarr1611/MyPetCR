import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { SiDatadog } from "react-icons/si";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import axios from "axios";
import logger from "../../logs";

interface Personnel {
  id: number;
  name: string;
  phoneNumber: number;
}

interface Pet {
  id: number;  // Added id field
  name: string;
}

interface Store {
  id: number;
  name: string;
}


const RegisterAppointmentDetails: React.FC = () => {
  guestRedirection();
  handleExpiration();
  const location = useLocation();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    clientID: location.state.clientID,
    petName: "",
    personnelId: "",
    store: "",
    dateTime: "",
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [showPersonnelTable, setShowPersonnelTable] = useState(false);

  const clientID = location.state;

  useEffect(() => {
    const fetchClient = async () => {
      try { 
        const personnelResponse = await axios.get(`http://localhost:8080/api/v1/employee/`);
        const personnelList = personnelResponse.data.map((obj: any) => ({
          id: obj.IDEmployee,
          name: obj.Name,
          phoneNumber: obj.PhoneNumber
        }));
        setPersonnel(personnelList);         

        const petResponse = await axios.get(`http://localhost:8080/api/v1/petByClient/${clientID}`)
        const petList = petResponse.data.map((obj: any) => ({
          id: obj.IDPet,
          name: obj.PetName
        }));
        setPets(petList);         

        const storeResponse = await axios.get(`http://localhost:8080/api/v1/store/`);
        const storeList = storeResponse.data.map((obj: any) => ({
          id: obj.IDStore,
          name: obj.Location
        }));
        setStores(storeList);
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
      setAppointment({ ...appointment, idPet: selectedPetId, petName: e.target.value });  
    } else if (e.target.name === "store") {
      const selectedStoreId = e.target.selectedOptions[0].getAttribute("data-id");
      setAppointment({ ...appointment, store: e.target.value, idStore: selectedStoreId });
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
        !appointment.dateTime
      ) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        try {
          const petResponse = await axios.get(`http://localhost:8080/api/v1/client/`, {
            params: {
              "Name": clientID
            }
          });
          const petList = petResponse.data.map((obj: any) => ({
            id: obj.IDPet,
            name: obj.PetName
          }));
          setPets(petList); 

          const url = `http://localhost:8080/api/v1/appointmentandinvoice/`;
          const param = {
            "IDPet": appointment.idPet,
            "IDEmployee": appointment.personnelId,
            "IDClient": clientID,
            "IDStore": appointment.idStore,
            "IDStatus": 1,
            "DateTime": appointment.dateTime
          }
          await axios.post(url, param);
        } catch (error) {
          toast.error("Failed to update client", {
            autoClose: 1500,
            theme: "colored",
          });
        }
        toast.success("Appointment created successfully", {
          autoClose: 1500,
          theme: "colored",
        });
        logger.request(`The user has added an appointment`);
        navigate("/dashboard/appointments");
      }
    } catch (error) {
      toast.error("An error occurred while creating the appointment", {
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
            <h1 className="h4">Create Appointment</h1>
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
                  <option key={store.id} value={store.name} data-id={store.id}>
                    {store.name}
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
                Create Appointment
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
                {personnel.map((person, index) => (
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
