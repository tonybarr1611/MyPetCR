
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MedicalFileDetails = () => {
  const navigate = useNavigate();

  const appointmentData = {
    id: 101,
    status: 'Completed',
    petName: 'Buddy',
    owner: 'Tony',
    dateTime: '2023-06-01 10:00 AM',
    invoiceId: 5001,
  };

  const invoiceDetails = [
    { id: 1, product: 1001, description: 'Rabies Vaccine', quantity: 1, price: 50.00 },
    { id: 2, product: 1002, description: 'Heartworm Prevention', quantity: 3, price: 30.00 },
  ];

  const handleEditInvoiceDetail = (detailId: number) => {
    navigate(`/editinvoicedetail/${detailId}`);
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <h2>Medical File Details</h2>
          <Table striped bordered hover responsive className="mb-3">
            <tbody>
              <tr>
                <td>ID Appointment</td>
                <td>{appointmentData.id}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{appointmentData.status}</td>
              </tr>
              <tr>
                <td>Dog</td>
                <td>{appointmentData.petName}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{appointmentData.owner}</td>
              </tr>
              <tr>
                <td>Date/Time</td>
                <td>{appointmentData.dateTime}</td>
              </tr>
              <tr>
                <td>ID Invoice</td>
                <td>{appointmentData.invoiceId}</td>
              </tr>
            </tbody>
          </Table>

          <h3>Invoice Details</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Invoice Detail</th>
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  <td>{detail.product}</td>
                  <td>{detail.description}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.price.toFixed(2)}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditInvoiceDetail(detail.id)}
                    >
                      Edit
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

export default MedicalFileDetails;
