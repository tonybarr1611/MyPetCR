import { Container, Row, Col, Table } from "react-bootstrap";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import MedicalFileInfoData from "./MedicalFileInfoData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MedicalFileInfo = () => {
  guestRedirection();
  handleExpiration();
  const [petData, setPetData] = useState({
    id: "",
    breed: "",
    owner: "",
    petName: "",
    birthdate: "",
    weight: "",
    notes: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [commerceFlag, setCommerceFlag] = useState(false);
  const location = useLocation();
  const id = location.state;
  const formatDate = (date: any) => {
    return `${date.slice(0, 10)} ${date.slice(11, 16)}`;
  };

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        console.log(id);

        const response = await axios.get(
          `http://localhost:8080/api/v1/pet/${id}`
        );
        setPetData({
          id: response.data[0].IDPet,
          breed: response.data[0].BreedName,
          owner: response.data[0].UserName,
          petName: response.data[0].PetName,
          birthdate: formatDate(response.data[0].Birthdate),
          weight: response.data[0].Weight,
          notes: response.data[0].Notes,
        });
        // if id is 1, set the tuple with id=1 to
        // breed="No aplica"
        // owner="No aplica"
        // petName="Ventas de e-commerce"
        // birthdate="No aplica"
        // weight="No aplica"
        // notes="Se presentan las ventas del e-commerce, cada registro representa una venta realizada a un cliente."
        if (id === 1) {
          setCommerceFlag(true);
          setPetData({
            id: response.data[0].IDPet,
            breed: "No aplica",
            owner: "No aplica",
            petName: "Ventas de e-commerce",
            birthdate: "No aplica",
            weight: "No aplica",
            notes:
              "Se presentan las ventas del e-commerce, cada registro representa una venta realizada a un cliente.",
          });
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
        toast.error("Failed to fetch pet data", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/appointment/pet/${id}`
        );
        const appointmentlist = response.data.map((obj: any) => ({
          id: obj.IDAppointment,
          employee: obj.EmployeeName,
          store: obj.Location,
          status: obj.StatusName,
          dateTime: formatDate(obj.DateTime),
        }));
        setAppointments(appointmentlist);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    fetchPetData();
    fetchAppointments();
  }, [id]); // Added dependency to useEffect to avoid warnings and unnecessary re-fetches

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <h2>Medical File Info</h2>
          <Table striped bordered hover responsive className="mb-3">
            <tbody>
              <tr>
                <td>Breed</td>
                <td>{petData.breed}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{petData.owner}</td>
              </tr>
              <tr>
                <td>Pet Name</td>
                <td>{petData.petName}</td>
              </tr>
              <tr>
                <td>Birthdate</td>
                <td>{petData.birthdate}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{petData.weight}</td>
              </tr>
              <tr>
                <td>Notes</td>
                <td>{petData.notes}</td>
              </tr>
            </tbody>
          </Table>

          <h3>Appointments</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Appointment</th>
                <th>Employee</th>
                <th>Store</th>
                <th>Status</th>
                <th>Date/Time</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) =>
                MedicalFileInfoData(appointment)
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicalFileInfo;
