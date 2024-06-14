import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MedicalFileInfo = () => {
  const navigate = useNavigate();

  const petData = {
    id: 1,
    petType: 'Dog',
    breed: 'Golden Retriever',
    owner: 'Tony',
    petName: 'Buddy',
    birthdate: '2020-01-01',
    weight: '30kg',
    notes: 'Healthy and active'
  };

  const appointments = [
    { id: 101, employee: 'Dr. Smith', store: 'Main Clinic', status: 'Completed', dateTime: '2023-06-01 10:00 AM' },
    { id: 102, employee: 'Dr. John', store: 'Main Clinic', status: 'Pending', dateTime: '2023-06-10 02:00 PM' },
  ];

  const handleInvestigateAppointment = (appointmentId: number) => {
    navigate (`/medicalfileDetails/${appointmentId}`);
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <h2>Medical File Info</h2>
          <Table striped bordered hover responsive className="mb-3">
            <tbody>
              <tr>
                <td>ID Pet</td>
                <td>{petData.id}</td>
              </tr>
              <tr>
                <td>Pet Type</td>
                <td>{petData.petType}</td>
              </tr>
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
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.employee}</td>
                  <td>{appointment.store}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.dateTime}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleInvestigateAppointment(appointment.id)}
                    >
                      Investigate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicalFileInfo;
